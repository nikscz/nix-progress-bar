🇬🇧 [English](README.md)

# nix progress-bar

**Wie lange braucht Claude noch? Ein schlanker Balken über dem Eingabefeld sagt es dir.**

## Das Problem

Claude arbeitet, und du weißt nicht: Dauert das zehn Sekunden oder fünf Minuten? Lohnt sich ein Kaffee? Claude Code zeigt nur, *dass* gearbeitet wird – nicht, wie lange noch.

## Die Lösung

Ein schlanker Balken über dem Eingabefeld zeigt die Restzeit und eine Schätzung, die mit jeder Antwort dazulernt. Gestaltet, um sich in Claude einzufügen: Claudes eigene Farben, Dark Mode, keine wilden Farben – clean und minimal.

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

Kein GitHub-Konto nötig.

## So geht’s

- Links die **Restzeit**, rechts die geschätzte Gesamtdauer – per Klick umschaltbar auf „um 14:32 Uhr“.
- Kleine Labels zeigen, was gerade läuft: **DATA** (Dateien), **TERM** (Terminal), **WEB**, **AGENT**.
- Die Schätzung **lernt mit jeder Antwort** – in beide Richtungen, ohne pauschalen Aufschlag.
- Wartet Claude auf dich (Erlaubnis, Rückfrage), steht dort **„wartet auf dich“** und die Uhr hält an.
- Gespeichert werden nur gelernte Zeiten, in Claude Codes eigenem Plugin-Speicher.
- Folgt deiner Systemsprache (Deutsch oder Englisch).

| Befehl | Was passiert |
|---|---|
| `/nix-progress-bar` | blendet den Balken aus und wieder ein |

### Add-on: nix-checklist-sidebar

Mit [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar) dazu zeigt der Balken
Claudes Schritte als **Pills**, und die Schätzung rechnet mit dem Tempo der schon erledigten Schritte
weiter – deutlich genauer. Ohne das Add-on funktioniert der Balken genauso, nur ohne Pills.

> [!WARNING]
> **Frühe Version – Updates kommen.** Diese Art Erweiterung ist bei Claude Code noch ganz neu.
> Nach einem Update von Anthropic kann etwas nicht mehr funktionieren, bis hier ein Fix kommt.
> Mit automatischen Updates (unten) bekommst du ihn von selbst.

## Updates

Einmal einschalten und vergessen: `/plugin` eingeben → **Marketplaces** → **nix-progress-bar** →
automatische Updates an.

Oder von Hand, wann immer du willst:
```
/plugin marketplace update nix-progress-bar
```

### Neu

**2.2.0 – Deutsch und Englisch.** Die festen Wörter des Tools folgen jetzt deiner Systemsprache:
Deutsch auf einem deutschen System, sonst Englisch. Andere Sprachen (z. B. Spanisch) bekommen die
englischen Wörter – alles, was Claude selbst schreibt (die Schritte, der Danke-Satz, die Antworten),
kommt aber ohnehin in deiner Sprache.

## Deinstallieren

```
/plugin uninstall nix-progress-bar@nix-progress-bar
```

## Mehr von nix

- [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar) – Claudes Plan als Checkliste
- [nix-note](https://github.com/nikscz/nix-note) – Projekt-Notizen nebenbei mit /note
- [nix-done-sound](https://github.com/nikscz/nix-done-sound) – dein eigener Alert-Sound, wenn Claude fertig ist

## Lizenz

[MIT](LICENSE) – nutzen, ändern, weitergeben erlaubt, ohne Gewähr.

Mit Claudius, für Claudius. Fehler gefunden oder eine Idee?
Gern ein [Issue](https://github.com/nikscz/nix-progress-bar/issues) aufmachen.
