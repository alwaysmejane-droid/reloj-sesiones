"""Genera sesiones.ics: aperturas de Asia, Londres y Nueva York en hora de Nueva York, con recordatorio de 10 minutos."""
import os

SESIONES = [
    ("Apertura Asia", "20261101T180000", "PT10H", "SU,MO,TU,WE,TH", "asia"),
    ("Apertura Londres", "20261102T030000", "PT9H", "MO,TU,WE,TH,FR", "londres"),
    ("Apertura Nueva York", "20261102T093000", "PT7H30M", "MO,TU,WE,TH,FR", "ny"),
]
L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Reloj de sesiones//ES", "CALSCALE:GREGORIAN",
     "X-WR-CALNAME:Aperturas de mercado (hora de NY)",
     "BEGIN:VTIMEZONE", "TZID:America/New_York",
     "BEGIN:DAYLIGHT", "TZOFFSETFROM:-0500", "TZOFFSETTO:-0400", "TZNAME:EDT", "DTSTART:19700308T020000",
     "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU", "END:DAYLIGHT",
     "BEGIN:STANDARD", "TZOFFSETFROM:-0400", "TZOFFSETTO:-0500", "TZNAME:EST", "DTSTART:19701101T020000",
     "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU", "END:STANDARD", "END:VTIMEZONE"]
for nombre, inicio, dur, dias, uid in SESIONES:
    L += ["BEGIN:VEVENT", "UID:" + uid + "@reloj-sesiones", "DTSTAMP:20261101T120000Z",
          "DTSTART;TZID=America/New_York:" + inicio, "DURATION:" + dur,
          "RRULE:FREQ=WEEKLY;BYDAY=" + dias, "SUMMARY:" + nombre,
          "END:VEVENT"]
L.append("END:VCALENDAR")
destino = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "sesiones.ics")
with open(destino, "w", encoding="utf-8", newline="") as f:
    f.write("\r\n".join(L) + "\r\n")
print("sesiones.ics listo")
