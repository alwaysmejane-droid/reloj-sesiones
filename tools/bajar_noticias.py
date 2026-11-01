"""Baja el calendario economico de la semana (Forex Factory, feed publico) y lo guarda en noticias.json.
Lo corre GitHub Actions cada pocas horas; tambien se puede correr a mano: python tools/bajar_noticias.py"""
import json
import os
import urllib.request

URL = "https://nfs.faireconomy.media/ff_calendar_thisweek.json"
DESTINO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "noticias.json")

req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=30) as r:
    datos = json.load(r)
if not isinstance(datos, list) or not datos:
    raise SystemExit("feed vacio, no se sobreescribe noticias.json")
with open(DESTINO, "w", encoding="utf-8") as f:
    json.dump(datos, f, ensure_ascii=False)
print("noticias guardadas:", len(datos))
