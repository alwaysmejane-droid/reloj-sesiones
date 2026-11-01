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
    revisarAlarma(s, on, fwd, dif);
    var pct = on ? Math.min(100, Math.round(back / (back + fwd) * 100)) : 0;
    html += '<div class="s' + (on ? " on" : "") + '" style="--c:' + s.col + '">' +
      '<div class="top"><span class="dot"></span><div><div class="nom">' + s.n + '</div>' +
      '<div class="rng">' + h12(s.a) + ' a ' + h12(s.c) + ' NY</div>' +
      '<div class="rng rcu">' + h12(s.a + dif * 60) + ' a ' + h12(s.c + dif * 60) + ' Cuba</div></div>' +
      '<div class="der"><div class="est">' + (on ? "Abierta" : "Cerrada") + '</div>' +
      '<div class="cnt">' + (on ? "cierra en " : "abre en ") + dur(fwd) + '</div></div></div>' +
      (on ? '<div class="bar"><i style="width:' + pct + '%"></i></div>' : "") + '</div>';
  });
  $("ses").innerHTML = html;
}

var AL_KEY = "alarmas_v1", ALARMAS = {}, ESTADO_PREV = {}, AUDIO = null;
function cargarAlarmas() {
  try { ALARMAS = JSON.parse(localStorage.getItem(AL_KEY) || "{}"); } catch (e) { ALARMAS = {}; }
  SESIONES.forEach(function (s) { if (!ALARMAS[s.n]) ALARMAS[s.n] = {on: false, min: 10}; });
}
function guardarAlarmas() {
  try { localStorage.setItem(AL_KEY, JSON.stringify(ALARMAS)); } catch (e) {}
}
function permisoAvisos() {
  try {
    if (!AUDIO && (window.AudioContext || window.webkitAudioContext)) AUDIO = new (window.AudioContext || window.webkitAudioContext)();
    if (AUDIO && AUDIO.state === "suspended") AUDIO.resume();
  } catch (e) {}
  try {
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
  } catch (e) {}
}
function sonido() {
  try {
    if (!AUDIO) return;
    for (var i = 0; i < 3; i++) {
      var o = AUDIO.createOscillator(), g = AUDIO.createGain(), t = AUDIO.currentTime + i * 0.35;
      o.frequency.value = 880; o.connect(g); g.connect(AUDIO.destination);
      g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      o.start(t); o.stop(t + 0.3);
    }
  } catch (e) {}
}
function disparar(titulo, texto) {
  var av = $("aviso");
  if (av) { av.textContent = titulo + " · " + texto; av.hidden = false; }
  sonido();
  try { if (navigator.vibrate) navigator.vibrate([300, 150, 300]); } catch (e) {}
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(function (reg) { reg.showNotification(titulo, {body: texto, icon: "icon.svg"}); });
      } else { new Notification(titulo, {body: texto}); }
    }
  } catch (e) {}
}
function revisarAlarma(s, on, fwd, dif) {
  var a = ALARMAS[s.n]; if (!a || !a.on) return;
  var prev = ESTADO_PREV[s.n]; ESTADO_PREV[s.n] = on;
  var minuto = Math.floor(Date.now() / 60000), horas = h12(s.a) + " NY / " + h12(s.a + dif * 60) + " Cuba", key;
  if (on) {
    if (prev === false && a.min === 0) {
      key = s.n + ":" + minuto;
      if (a.ult !== key) { a.ult = key; guardarAlarmas(); disparar(s.n + " abrió", horas); }
    }
    return;
  }
  if (a.min > 0 && fwd <= a.min) {
    key = s.n + ":" + (minuto + fwd);
    if (a.ult !== key) { a.ult = key; guardarAlarmas(); disparar(s.n + " abre en " + fwd + " min", horas); }
  }
}
function armarAlarmas() {
  var c = $("alarmas"); if (!c) return;
  cargarAlarmas();
  var h = "";
  SESIONES.forEach(function (s, i) {
    var a = ALARMAS[s.n];
    h += '<label class="al"><input type="checkbox" data-i="' + i + '"' + (a.on ? " checked" : "") + '><span class="alt">' + s.n + '</span><select data-m="' + i + '">' +
      [0, 5, 10, 15, 30].map(function (m) { return '<option value="' + m + '"' + (a.min === m ? " selected" : "") + '>' + (m ? m + " min antes" : "a la hora") + '</option>'; }).join("") +
      '</select></label>';
  });
  c.innerHTML = h;
  c.onchange = function (e) {
    var t = e.target;
    if (t.dataset.i !== undefined) { ALARMAS[SESIONES[t.dataset.i].n].on = t.checked; if (t.checked) permisoAvisos(); }
    if (t.dataset.m !== undefined) { ALARMAS[SESIONES[t.dataset.m].n].min = +t.value; }
    guardarAlarmas();
  };
  var av = $("aviso"); if (av) av.onclick = function () { av.hidden = true; };
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

armarAlarmas();
pintar();
cargarNoticias();
setInterval(pintar, 1000);
setInterval(cargarNoticias, 30 * 60 * 1000);
setInterval(pintarNoticias, 60 * 1000);
document.addEventListener("visibilitychange", function () { if (!document.hidden) pintar(); });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(function () {});
}
