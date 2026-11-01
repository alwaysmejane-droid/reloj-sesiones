var CUBA_ZONA = "Etc/GMT+4";
var CUBA_UTC = -4;
var NY_ZONA = "America/New_York";
var SESIONES = [
  {n: "Asia", a: 18 * 60, c: 4 * 60, col: "#f5a524"},
  {n: "Londres", a: 3 * 60, c: 12 * 60, col: "#4da3ff"},
  {n: "Nueva York", a: 8 * 60, c: 17 * 60, col: "#2fd18b"}
];
var CIERRE_SEMANA = 17 * 60;
var APERTURA_SEMANA = 18 * 60;

function $(id) { return document.getElementById(id); }
function dos(n) { return ("0" + n).slice(-2); }

function hora12(zona, d) {
  var p = new Intl.DateTimeFormat("en-US", {timeZone: zona, hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit"}).formatToParts(d), o = {};
  p.forEach(function (x) { o[x.type] = x.value; });
  return {t: o.hour + ":" + o.minute + ":" + o.second, ap: o.dayPeriod};
}
function fechaTxt(zona, d) {
  return new Intl.DateTimeFormat("es-ES", {timeZone: zona, weekday: "long", day: "numeric", month: "short"}).format(d);
}
function enNY(d) {
  var p = new Intl.DateTimeFormat("en-US", {timeZone: NY_ZONA, hour12: false, weekday: "short", hour: "2-digit", minute: "2-digit"}).formatToParts(d), o = {};
  p.forEach(function (x) { o[x.type] = x.value; });
  var w = {Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6}[o.weekday];
  return {w: w, h: o.hour % 24, m: +o.minute};
}
function offsetNY(d) {
  var a = new Date(d.toLocaleString("en-US", {timeZone: NY_ZONA}));
  var b = new Date(d.toLocaleString("en-US", {timeZone: "UTC"}));
  return Math.round((a - b) / 3600000);
}
function abierta(s, wm) {
  var d = Math.floor(wm / 1440) % 7, t = wm % 1440;
  if (d === 6) return false;
  if (d === 5 && t >= CIERRE_SEMANA) return false;
  if (d === 0 && t < APERTURA_SEMANA) return false;
  return s.a < s.c ? (t >= s.a && t < s.c) : (t >= s.a || t < s.c);
}
function dur(m) {
  var h = Math.floor(m / 60), mm = m % 60;
  return h > 0 ? h + " h " + mm + " min" : mm + " min";
}
function durS(t) {
  var h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60;
  return (h ? h + " h " : "") + dos(m) + " min " + '<span class="seg">' + dos(s) + " s</span>";
}
function h12(m) {
  m = ((m % 1440) + 1440) % 1440;
  var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "PM" : "AM";
  h = h % 12; if (h === 0) h = 12;
  return h + ":" + dos(mm) + " " + ap;
}

function pintar() {
  var ahora = new Date();
  var c = hora12(CUBA_ZONA, ahora), n = hora12(NY_ZONA, ahora);
  $("cuh").innerHTML = c.t + "<small>" + c.ap + "</small>";
  $("nyh").innerHTML = n.t + "<small>" + n.ap + "</small>";
  $("cuf").textContent = fechaTxt(CUBA_ZONA, ahora);
  $("nyf").textContent = fechaTxt(NY_ZONA, ahora);
  var dif = CUBA_UTC - offsetNY(ahora);
  $("dif").textContent = dif === 0 ? "Cuba y Nueva York van a la misma hora ahora."
    : "Cuba va " + Math.abs(dif) + " h " + (dif > 0 ? "por delante de" : "por detrás de") + " Nueva York ahora.";

  var z = enNY(ahora), wm = z.w * 1440 + z.h * 60 + z.m, html = "";
  SESIONES.forEach(function (s) {
    var on = abierta(s, wm), fwd = 1, back = 0;
    while (fwd <= 8 * 1440 && abierta(s, (wm + fwd) % 10080) === on) fwd++;
    while (back < 1440 && abierta(s, (wm - back - 1 + 10080) % 10080) === on) back++;
    var rest = Math.max(1, fwd * 60 - ahora.getSeconds());
    var pct = on ? Math.min(100, Math.round(back / (back + fwd) * 100)) : 0;
    html += '<div class="s' + (on ? " on" : "") + '" style="--c:' + s.col + '">' +
      '<div class="top"><span class="dot"></span><div><div class="nom">' + s.n + '</div>' +
      '<div class="rng rny">' + h12(s.a) + ' a ' + h12(s.c) + ' NY</div>' +
      '<div class="rng rcu">' + h12(s.a + dif * 60) + ' a ' + h12(s.c + dif * 60) + ' Cuba</div></div>' +
      '<div class="der"><div class="est">' + (on ? "Abierta" : "Cerrada") + '</div>' +
      '<div class="cnt' + (rest < 600 ? " urg" : "") + '">' + (on ? "cierra en " : "abre en ") + durS(rest) + '</div></div></div>' +
      (on ? '<div class="bar"><i style="width:' + pct + '%"></i></div>' : "") + '</div>';
  });
  $("ses").innerHTML = html;
}

var DIAS_SES = {"Asia": [0, 1, 2, 3, 4], "Londres": [1, 2, 3, 4, 5], "Nueva York": [1, 2, 3, 4, 5]};
var CODIGO_DIA = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
function p2(n) { return ("0" + n).slice(-2); }
function urlGoogle(s, modo) {
  var ahora = new Date(), z = enNY(ahora), nowMin = z.h * 60 + z.m;
  var ymd = claveDia(ahora).split("-"), base = Date.UTC(+ymd[0], +ymd[1] - 1, +ymd[2]);
  var dias = DIAS_SES[s.n], k, fecha, wd;
  for (k = 0; k < 8; k++) {
    fecha = new Date(base + k * 86400000); wd = fecha.getUTCDay();
    if (dias.indexOf(wd) >= 0 && !(k === 0 && nowMin >= s.a)) break;
  }
  var fin = new Date(fecha.getTime() + (s.c <= s.a ? 86400000 : 0));
  function ymdStr(d) { return d.getUTCFullYear() + p2(d.getUTCMonth() + 1) + p2(d.getUTCDate()); }
  function hm(m) { return p2(Math.floor(m / 60)) + p2(m % 60) + "00"; }
  var regla = "RRULE:FREQ=WEEKLY;BYDAY=" + dias.map(function (d) { return CODIGO_DIA[d]; }).join(",");
  if (modo === "semana") regla += ";COUNT=" + (dias[dias.length - 1] - wd + 1);
  return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("Apertura " + s.n) +
    "&dates=" + ymdStr(fecha) + "T" + hm(s.a) + "/" + ymdStr(fin) + "T" + hm(s.c) +
    "&ctz=America/New_York&recur=" + encodeURIComponent(regla) +
    "&details=" + encodeURIComponent("Sesión de " + s.n + " (hora de Nueva York)");
}
function armarCalendario() {
  var cont = $("calbtns"), sel = $("rep");
  if (!cont || !sel) return;
  function pintarBotones() {
    cont.innerHTML = SESIONES.map(function (s) {
      return '<a target="_blank" rel="noopener" style="--c:' + s.col + '" href="' + urlGoogle(s, sel.value) + '">Google Calendar: ' + s.n + '</a>';
    }).join("");
  }
  sel.onchange = pintarBotones;
  pintarBotones();
}

var NOTICIAS = null;
function claveDia(d) {
  return new Intl.DateTimeFormat("en-CA", {timeZone: NY_ZONA}).format(d);
}
function pintarNoticias() {
  var cont = $("nots");
  if (!cont) return;
  if (!NOTICIAS) { cont.innerHTML = '<div class="vacio">No se pudieron cargar las noticias.</div>'; return; }
  var ahora = new Date(), hoy = claveDia(ahora), color = {High: "#ff5d5d", Medium: "#f5a524"}, html = "", hay = 0;
  NOTICIAS.forEach(function (e) {
    if (!color[e.impact]) return;
    var d = new Date(e.date);
    if (claveDia(d) !== hoy) return;
    hay++;
    var hr = hora12(NY_ZONA, d);
    var datos = [];
    if (e.forecast) datos.push("prev. " + (e.previous || "-") + " / pron. " + e.forecast);
    html += '<div class="n' + (d < ahora ? " pasada" : "") + '" style="--ic:' + color[e.impact] + '">' +
      '<span class="h">' + hr.t.replace(/:\d\d$/, "") + " " + hr.ap + '</span><span class="m">' + e.country + '</span>' +
      '<span class="t">' + e.title + (datos.length ? '<span class="d">' + datos.join("") + '</span>' : "") + '</span></div>';
  });
  cont.innerHTML = hay ? html : '<div class="vacio">Hoy no hay noticias de impacto medio o alto.</div>';
}
function cargarNoticias() {
  fetch("noticias.json?t=" + Date.now()).then(function (r) { return r.json(); })
    .then(function (d) { NOTICIAS = d; pintarNoticias(); })
    .catch(function () { pintarNoticias(); });
}

armarCalendario();
pintar();
cargarNoticias();
setInterval(pintar, 1000);
setInterval(cargarNoticias, 30 * 60 * 1000);
setInterval(pintarNoticias, 60 * 1000);
document.addEventListener("visibilitychange", function () { if (!document.hidden) pintar(); });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(function () {});
}
