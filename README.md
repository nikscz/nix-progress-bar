# nix progress-bar

**Wie lange braucht Claude noch? Ein schlanker Balken über dem Eingabefeld sagt es dir.**

> [!WARNING]
> **Frühe Version – Updates kommen.** Diese Art Erweiterung ist bei Claude Code noch ganz neu.
> Nach einem Update von Anthropic kann etwas nicht mehr funktionieren, bis hier ein Fix kommt.
> Mit Updates eingeschaltet (siehe unten) bekommst du ihn automatisch.

## Das Problem

Claude arbeitet, und du weißt nicht: Dauert das zehn Sekunden oder fünf Minuten? Lohnt es
sich, kurz Kaffee zu holen? Claude Code zeigt nur, *dass* gearbeitet wird – nicht, wie lange
noch.

## Die Lösung

Ein dezenter Balken über dem Eingabefeld:

- Links die **Restzeit**, rechts die geschätzte Gesamtdauer – per Klick umschaltbar auf
  „um 14:32 Uhr“.
- Kleine Labels zeigen, was gerade läuft: **DATA** (Dateien), **TERM** (Terminal),
  **WEB** (Internet), **AGENT**.
- Die Schätzung **lernt mit jeder Antwort** – in beide Richtungen, ohne pauschalen Aufschlag.
- Wartet Claude auf dich (Erlaubnis, Rückfrage), steht dort **„wartet auf dich“** und die
  Uhr hält an.
- Mit [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar): die Schritte
  als **Pills**, und die Schätzung rechnet mit dem Tempo der erledigten Schritte weiter.

**Befehl:** `/nix-progress-bar` blendet den Balken aus und wieder ein.

Gespeichert werden nur gelernte Zeiten, in Claude Codes eigenem Plugin-Speicher.

## Design

Fügt sich in Claude ein, statt aufzufallen: die Farben und Schriften der Claude-App, Dark Mode,
keine wilden Farben – clean und minimal. Funktioniert in der Desktop-App und im Terminal.

## Installieren

1. Claude Code öffnen (Desktop-App oder Terminal).
2. Ins Eingabefeld schreiben und Enter drücken:
   ```
   /plugin marketplace add nikscz/nix-progress-bar
   ```
3. Dann:
   ```
   /plugin install nix-progress-bar@nix-progress-bar
   ```
4. Claude Code einmal neu starten (oder `/reload-plugins` eingeben). Fertig.

## Updates

Einmal einschalten und vergessen: `/plugin` eingeben → **Marketplaces** → **nix-progress-bar** →
automatische Updates an.

Oder von Hand, wann immer du willst:
```
/plugin marketplace update nix-progress-bar
```

## Deinstallieren

```
/plugin uninstall nix-progress-bar@nix-progress-bar
```

## Mehr von nix

- [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar) – Claudes Plan als Checkliste
- [nix-note](https://github.com/nikscz/nix-note) – Notizen nebenbei mit /note
- [nix-done-sound](https://github.com/nikscz/nix-done-sound) – dein eigener Sound, wenn Claude fertig ist

## Lizenz

[MIT](LICENSE) – nutzen, ändern, weitergeben erlaubt, ohne Gewähr.

Mit Claude gebaut, für Claude. Fehler gefunden oder eine Idee?
Gern ein [Issue](https://github.com/nikscz/nix-progress-bar/issues) aufmachen.
