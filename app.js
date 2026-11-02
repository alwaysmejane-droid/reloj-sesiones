var CUBA_ZONA = "Etc/GMT+4";
var CUBA_UTC = -4;
// Zona elegida por cada persona para la tarjeta grande (se guarda solo en su aparato). Por defecto, Moscu.
// [pais, zona por defecto, ciudades]; una ciudad puede ser [nombre, zona] si su zona es otra. La primera es la que se elige al cambiar de pais.
var PAISES = [
  ["Alemania","Europe/Berlin",["Berlín","Hamburgo","Múnich","Colonia","Fráncfort","Stuttgart","Düsseldorf","Leipzig","Dortmund","Dresde"]],
  ["Arabia Saudita","Asia/Riyadh",["Riad","Yeda","La Meca","Medina","Dammam","Taif"]],
  ["Argentina","America/Argentina/Buenos_Aires",["Buenos Aires","Córdoba","Rosario","Mendoza","La Plata","Tucumán","Mar del Plata","Salta","Santa Fe","Neuquén"]],
  ["Australia","Australia/Sydney",["Sídney","Canberra","Newcastle",["Melbourne","Australia/Melbourne"],["Brisbane","Australia/Brisbane"],["Gold Coast","Australia/Brisbane"],["Perth","Australia/Perth"],["Adelaida","Australia/Adelaide"],["Hobart","Australia/Hobart"],["Darwin","Australia/Darwin"]]],
  ["Bolivia","America/La_Paz",["La Paz","Santa Cruz de la Sierra","Cochabamba","Sucre","Oruro","Tarija"]],
  ["Brasil","America/Sao_Paulo",["Brasilia","São Paulo","Río de Janeiro","Salvador","Fortaleza","Belo Horizonte","Curitiba","Recife","Porto Alegre",["Manaos","America/Manaus"]]],
  ["Canadá","America/Toronto",["Toronto","Montreal","Ottawa","Quebec",["Vancouver","America/Vancouver"],["Victoria","America/Vancouver"],["Calgary","America/Edmonton"],["Edmonton","America/Edmonton"],["Winnipeg","America/Winnipeg"],["Saskatoon","America/Regina"],["Halifax","America/Halifax"]]],
  ["Chile","America/Santiago",["Santiago","Valparaíso","Viña del Mar","Concepción","Antofagasta","La Serena","Temuco","Iquique"]],
  ["China","Asia/Shanghai",["Pekín","Shanghái","Cantón","Shenzhen","Chengdu","Chongqing","Tianjin","Wuhan","Hangzhou","Nankín"]],
  ["Colombia","America/Bogota",["Bogotá","Medellín","Cali","Barranquilla","Cartagena","Bucaramanga","Cúcuta","Pereira","Santa Marta","Manizales"]],
  ["Corea del Sur","Asia/Seoul",["Seúl","Busan","Incheon","Daegu","Daejeon","Gwangju"]],
  ["Costa Rica","America/Costa_Rica",["San José","Alajuela","Cartago","Heredia","Liberia","Puntarenas"]],
  ["Ecuador","America/Guayaquil",["Quito","Guayaquil","Cuenca","Ambato","Manta","Loja"]],
  ["Egipto","Africa/Cairo",["El Cairo","Alejandría","Guiza","Luxor","Asuán","Sharm el-Sheij"]],
  ["El Salvador","America/El_Salvador",["San Salvador","Santa Ana","San Miguel","Soyapango","Santa Tecla","La Libertad"]],
  ["Emiratos Árabes","Asia/Dubai",["Dubái","Abu Dabi","Sharjah","Al Ain","Ajmán","Ras Al Khaimah"]],
  ["España","Europe/Madrid",["Madrid","Barcelona","Valencia","Sevilla","Málaga","Bilbao","Zaragoza","Palma de Mallorca",["Las Palmas","Atlantic/Canary"],["Santa Cruz de Tenerife","Atlantic/Canary"]]],
  ["Estados Unidos","America/New_York",["Nueva York","Miami","Atlanta","Washington D. C.","Boston","Filadelfia","Orlando",["Detroit","America/Detroit"],["Chicago","America/Chicago"],["Dallas (Texas)","America/Chicago"],["Houston (Texas)","America/Chicago"],["Austin (Texas)","America/Chicago"],["San Antonio (Texas)","America/Chicago"],["Arlington (Texas)","America/Chicago"],["Denver","America/Denver"],["Phoenix","America/Phoenix"],["Los Ángeles","America/Los_Angeles"],["San Francisco","America/Los_Angeles"],["San Diego","America/Los_Angeles"],["Las Vegas","America/Los_Angeles"],["Seattle","America/Los_Angeles"],["Anchorage","America/Anchorage"],["Honolulu","Pacific/Honolulu"]]],
  ["Filipinas","Asia/Manila",["Manila","Ciudad Quezón","Davao","Cebú","Zamboanga","Makati"]],
  ["Francia","Europe/Paris",["París","Marsella","Lyon","Toulouse","Niza","Nantes","Estrasburgo","Burdeos","Lille","Montpellier"]],
  ["Grecia","Europe/Athens",["Atenas","Salónica","Patras","Heraclión","Larisa","Rodas"]],
  ["Guatemala","America/Guatemala",["Ciudad de Guatemala","Quetzaltenango","Escuintla","Antigua Guatemala","Cobán","Puerto Barrios"]],
  ["Guyana","America/Guyana",["Georgetown","Linden","New Amsterdam","Anna Regina","Bartica","Skeldon"]],
  ["Honduras","America/Tegucigalpa",["Tegucigalpa","San Pedro Sula","La Ceiba","Choluteca","Comayagua","Puerto Cortés"]],
  ["Hong Kong","Asia/Hong_Kong",["Hong Kong","Kowloon","Tsuen Wan","Sha Tin","Tuen Mun"]],
  ["India","Asia/Kolkata",["Nueva Delhi","Bombay","Bangalore","Calcuta","Chennai","Hyderabad","Ahmedabad","Pune","Jaipur","Lucknow"]],
  ["Indonesia","Asia/Jakarta",["Yakarta","Surabaya","Bandung","Medan","Semarang","Yogyakarta",["Denpasar (Bali)","Asia/Makassar"],["Makassar","Asia/Makassar"]]],
  ["Irlanda","Europe/Dublin",["Dublín","Cork","Galway","Limerick","Waterford","Kilkenny"]],
  ["Israel","Asia/Jerusalem",["Tel Aviv","Jerusalén","Haifa","Beerseba","Eilat","Netanya"]],
  ["Italia","Europe/Rome",["Roma","Milán","Nápoles","Turín","Palermo","Génova","Bolonia","Florencia","Venecia","Bari"]],
  ["Japón","Asia/Tokyo",["Tokio","Osaka","Yokohama","Nagoya","Sapporo","Fukuoka","Kioto","Kobe"]],
  ["Marruecos","Africa/Casablanca",["Casablanca","Rabat","Marrakech","Fez","Tánger","Agadir"]],
  ["México","America/Mexico_City",["Ciudad de México","Guadalajara","Monterrey","Puebla","Mérida","León",["Cancún","America/Cancun"],["Tijuana","America/Tijuana"],["Hermosillo","America/Hermosillo"],["Chihuahua","America/Chihuahua"]]],
  ["Nicaragua","America/Managua",["Managua","León","Masaya","Granada","Matagalpa","Chinandega"]],
  ["Nigeria","Africa/Lagos",["Lagos","Abuya","Kano","Ibadán","Port Harcourt","Benin City"]],
  ["Nueva Zelanda","Pacific/Auckland",["Auckland","Wellington","Christchurch","Hamilton","Tauranga","Dunedin"]],
  ["Países Bajos","Europe/Amsterdam",["Ámsterdam","Róterdam","La Haya","Utrecht","Eindhoven","Groninga"]],
  ["Pakistán","Asia/Karachi",["Karachi","Lahore","Islamabad","Faisalabad","Rawalpindi","Multan"]],
  ["Panamá","America/Panama",["Ciudad de Panamá","Colón","David","Santiago","Chitré","La Chorrera"]],
  ["Paraguay","America/Asuncion",["Asunción","Ciudad del Este","Encarnación","San Lorenzo","Luque","Pedro Juan Caballero"]],
  ["Perú","America/Lima",["Lima","Arequipa","Trujillo","Chiclayo","Cusco","Piura","Iquitos","Huancayo"]],
  ["Polonia","Europe/Warsaw",["Varsovia","Cracovia","Łódź","Breslavia","Poznań","Gdansk"]],
  ["Portugal","Europe/Lisbon",["Lisboa","Oporto","Braga","Coímbra","Faro","Funchal",["Ponta Delgada (Azores)","Atlantic/Azores"]]],
  ["Puerto Rico","America/Puerto_Rico",["San Juan","Ponce","Bayamón","Carolina","Caguas","Mayagüez"]],
  ["Reino Unido","Europe/London",["Londres","Mánchester","Birmingham","Liverpool","Glasgow","Edimburgo","Bristol","Leeds","Cardiff","Belfast"]],
  ["República Dominicana","America/Santo_Domingo",["Santo Domingo","Santiago de los Caballeros","La Romana","San Pedro de Macorís","Puerto Plata","Punta Cana"]],
  ["Rusia","Europe/Moscow",["Moscú","San Petersburgo","Kazán","Nizhni Nóvgorod",["Kaliningrado","Europe/Kaliningrad"],["Samara","Europe/Samara"],["Ekaterimburgo","Asia/Yekaterinburg"],["Omsk","Asia/Omsk"],["Novosibirsk","Asia/Novosibirsk"],["Krasnoyarsk","Asia/Krasnoyarsk"],["Vladivostok","Asia/Vladivostok"]]],
  ["Singapur","Asia/Singapore",["Singapur","Jurong","Woodlands","Tampines","Sengkang"]],
  ["Sudáfrica","Africa/Johannesburg",["Johannesburgo","Ciudad del Cabo","Durban","Pretoria","Port Elizabeth","Bloemfontein"]],
  ["Suiza","Europe/Zurich",["Zúrich","Ginebra","Basilea","Berna","Lausana","Lucerna"]],
  ["Tailandia","Asia/Bangkok",["Bangkok","Chiang Mai","Pattaya","Phuket","Nonthaburi","Khon Kaen"]],
  ["Trinidad y Tobago","America/Port_of_Spain",["Puerto España","San Fernando","Chaguanas","Arima","Scarborough","Point Fortin","Couva"]],
  ["Turquía","Europe/Istanbul",["Estambul","Ankara","Esmirna","Bursa","Antalya","Adana","Konya","Gaziantep"]],
  ["Ucrania","Europe/Kyiv",["Kiev","Járkov","Odesa","Dnipró","Leópolis","Zaporiyia"]],
  ["Uruguay","America/Montevideo",["Montevideo","Salto","Paysandú","Maldonado","Punta del Este","Rivera"]],
  ["Venezuela","America/Caracas",["Caracas","Maracaibo","Valencia","Barquisimeto","Maracay","Ciudad Guayana","Barcelona","Mérida"]]
];
var CIUDADES = [];   // [pais, ciudad, zona]
PAISES.forEach(function (p) {
  p[2].forEach(function (c) { CIUDADES.push(typeof c === "string" ? [p[0], c, p[1]] : [p[0], c[0], c[1]]); });
});
var ZONA_DEF = {p: "Rusia", c: "Moscú", z: "Europe/Moscow"};
function zonaValida(z) { try { new Intl.DateTimeFormat("en-US", {timeZone: z}); return true; } catch (e) { return false; } }
function cargarZona() {
  try {
    var o = JSON.parse(localStorage.getItem("fenix_zona") || "null");
    if (o && o.z && o.c && zonaValida(o.z)) return o;
  } catch (e) {}
  return ZONA_DEF;
}
var ZONA = cargarZona();
var NY_ZONA = "America/New_York";
var SESIONES = [
  {n: "Asia", a: 18 * 60, c: 4 * 60, col: "#f5a524"},
  {n: "Londres", a: 3 * 60, c: 12 * 60, col: "#4da3ff"},
  {n: "Nueva York", a: 9 * 60 + 30, c: 17 * 60, col: "#2fd18b"}
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
function offsetMin(d, zona) {
  var a = new Date(d.toLocaleString("en-US", {timeZone: zona}));
  var b = new Date(d.toLocaleString("en-US", {timeZone: "UTC"}));
  return Math.round((a - b) / 60000);
}
function offsetNY(d) {
  return Math.round(offsetMin(d, NY_ZONA) / 60);
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

// Hora real: se pide a internet (cabecera Date del propio servidor) y NO se confia en la hora del telefono, que en Cuba
// queda mal al pasar la zona a manual. Si no hay internet se usa la del telefono.
var DESFASE = 0;   // milisegundos que hay que sumar a la hora del telefono para tener la hora real
function ahoraReal() { return new Date(Date.now() + DESFASE); }
function sincronizarHora() {
  var t0 = Date.now();
  fetch("./?hora=" + t0, {method: "HEAD", cache: "no-store"}).then(function (r) {
    var f = r.headers.get("Date"), t1 = Date.now(), servidor = f ? new Date(f).getTime() : NaN;
    if (isNaN(servidor)) return;
    var d = servidor + 500 + (t1 - t0) / 2 - t1;   // la cabecera viene en segundos enteros (+0,5 s) y se descuenta medio viaje
    DESFASE = Math.abs(d) < 1500 ? 0 : d;          // si el telefono esta bien (menos de 1,5 s de diferencia) no se toca
    pintar();
  }).catch(function () {});
}

function pintar() {
  var ahora = ahoraReal();
  var sg = ahora.getSeconds(), onda = sg < 30 ? sg / 30 : (60 - sg) / 30, t2 = document.querySelector(".t2");
  if (t2) t2.style.setProperty("--p", Math.round(onda * 100) + "%");
  var c = hora12(CUBA_ZONA, ahora), n = hora12(NY_ZONA, ahora);
  $("cuh").innerHTML = c.t + "<small>" + c.ap + "</small>";
  $("nyh").innerHTML = n.t + "<small>" + n.ap + "</small>";
  $("cuf").textContent = fechaTxt(CUBA_ZONA, ahora);
  $("nyf").textContent = fechaTxt(NY_ZONA, ahora);
  var r = hora12(ZONA.z, ahora);
  $("ruh").innerHTML = r.t + "<small>" + r.ap + "</small>";
  $("ruf").textContent = fechaTxt(ZONA.z, ahora);
  $("ruNom").textContent = ZONA.c === ZONA.p ? ZONA.c : ZONA.c + ", " + ZONA.p;
  var dif = CUBA_UTC - offsetNY(ahora), difRu = offsetMin(ahora, ZONA.z) - offsetMin(ahora, NY_ZONA) ; // difRu en MINUTOS
  function txtDif(nom, m) {
    var h = Math.floor(Math.abs(m) / 60), mm = Math.abs(m) % 60, t = h + " h" + (mm ? " " + mm + " min" : "");
    return m === 0 ? nom + " y Nueva York van a la misma hora ahora."
      : nom + " va " + t + " " + (m > 0 ? "por delante de" : "por detrás de") + " Nueva York ahora.";
  }
  $("dif").innerHTML = txtDif("Cuba", dif * 60) + "<br>" + txtDif(ZONA.c, difRu);

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
      '<div class="rng rcu">' + h12(s.a + dif * 60) + ' a ' + h12(s.c + dif * 60) + ' Cuba</div>' +
      '<div class="rng rru">' + h12(s.a + difRu) + ' a ' + h12(s.c + difRu) + ' ' + ZONA.c + '</div></div>' +
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
  var ahora = ahoraReal(), z = enNY(ahora), nowMin = z.h * 60 + z.m;
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
  var ahora = ahoraReal(), hoy = claveDia(ahora), color = {High: "#ff5d5d", Medium: "#f5a524"}, html = "", hay = 0;
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

function opciones(sel, textos, valores, elegido) {
  sel.innerHTML = textos.map(function (t, i) {
    return '<option value="' + valores[i] + '"' + (valores[i] === elegido ? " selected" : "") + ">" + t + "</option>";
  }).join("");
}
function guardarZona(x) {
  ZONA = {p: x[0], c: x[1], z: x[2]};
  try { localStorage.setItem("fenix_zona", JSON.stringify(ZONA)); } catch (err) {}
  pintar();
}
function armarSelector() {
  var btn = $("ruCambiar"), pk = $("picker"), sp = $("selPais"), sc = $("selCiudad");
  if (!btn || !pk || !sp || !sc) return;
  var paises = [];
  CIUDADES.forEach(function (x) { if (paises.indexOf(x[0]) < 0) paises.push(x[0]); });
  paises.sort(function (a, b) { return a.localeCompare(b, "es"); });
  function ciudadesDe(p) { return CIUDADES.filter(function (x) { return x[0] === p; }); }
  function llenarCiudades(p, elegida) {
    var lista = ciudadesDe(p), t = lista.map(function (x) { return x[1]; }), v = t.slice();
    if (!elegida) { t.unshift("Elige una ciudad…"); v.unshift(""); }
    opciones(sc, t, v, elegida || "");
  }
  function llenar() {
    opciones(sp, paises, paises, ZONA.p);
    llenarCiudades(ZONA.p, ZONA.c);
  }
  btn.onclick = function () {
    pk.hidden = !pk.hidden;
    btn.textContent = pk.hidden ? "Cambiar \u25be" : "Cerrar \u25b4";
    if (!pk.hidden) llenar();
  };
  sp.onchange = function () {          // al cambiar de pais se pide la ciudad; nada cambia hasta elegirla
    llenarCiudades(sp.value, null);
  };
  sc.onchange = function () {          // al elegir la ciudad se aplica y las listas se esconden
    if (!sc.value) return;
    guardarZona(ciudadesDe(sp.value).filter(function (x) { return x[1] === sc.value; })[0]);
    pk.hidden = true;
    btn.textContent = "Cambiar ▾";
  };
}

armarSelector();
armarCalendario();
sincronizarHora();
pintar();
cargarNoticias();
setInterval(pintar, 1000);
setInterval(sincronizarHora, 10 * 60 * 1000);
setInterval(cargarNoticias, 30 * 60 * 1000);
setInterval(pintarNoticias, 60 * 1000);
document.addEventListener("visibilitychange", function () { if (!document.hidden) { sincronizarHora(); pintar(); } });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(function () {});
}
