🇩🇪 [Deutsch](README.de.md)

# nix progress-bar

**How long will Claude take? A slim bar above the message box tells you.**

<img src="docs/overview-bar.png" alt="The progress bar above the message box in Claude" width="100%">

## The problem

Claude is working and you don't know: ten seconds or five minutes? Time to grab a coffee? Claude Code only shows *that* it is working – not how much longer.

## The solution

A slim bar above the message box shows the time left and an estimate that learns with every answer. Designed to blend into Claude: its own colours, dark mode, no loud colours – clean and minimal.

## Install

1. Open Claude Code (desktop app or terminal).
2. Type this into the message box and press Enter:
   ```
   /plugin marketplace add nikscz/nix-progress-bar
   ```
3. Then:
   ```
   /plugin install nix-progress-bar@nix-progress-bar
   ```
4. Restart Claude Code once (or type `/reload-plugins`). Done.

No GitHub account needed.

## How to

- Left: **time left**. Right: estimated total – click to switch to "at 14:32".
- Small labels show what is running: **DATA** (files), **TERM** (terminal), **WEB**, **AGENT**.
- The estimate **learns with every answer** – both ways, no flat buffer added.
- When Claude waits for you (permission, question), it says **"waiting for you"** and the clock stops.
- Only learned times are stored, in Claude Code's own plugin storage.
- Follows your system language (German or English) – or one you pick.

| Command | What happens |
|---|---|
| `/nix-progress-bar` | hides the bar and shows it again |
| `/nix-progress-bar english` / `deutsch` | fixed language for the bar |
| `/nix-progress-bar auto` | follows the system language again |

### Add-on: nix-checklist-sidebar

With [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar) the bar shows Claude's
steps as **pills**, and the estimate follows the pace of the steps already done – much more precise.
Without the add-on the bar works just the same, only without pills.

## Screenshots

Working – time left, steps as pills, estimated total:

<img src="docs/band-running.png" alt="Progress bar while Claude works" width="100%">

Done – duration, tokens and how far off the estimate was:

<img src="docs/band-done.png" alt="Progress bar when Claude is done" width="100%">

Together with the add-on [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar):

<img src="docs/overview-both.png" alt="Progress bar above the message box, checklist on the right" width="100%">

## Privacy & security

Everything stays on your computer:

| Reads | Stores |
|---|---|
| The length and kind of your message (short / medium / long work request) | only that class – never the text |
| Names of the tools Claude uses; for terminal commands the command, only to tell file changes apart | only the kind (DATA, TERM, WEB, AGENT) – never the command |
| Token count and duration of each answer; the checklist's steps (if installed) | durations and kinds, in Claude Code's plugin storage – nothing else |
| When Claude shows you a permission prompt | nothing – the clock just stops |

**Sends nothing anywhere.** No internet connection, no tracking, no analytics. The code is open –
you can check it yourself.

**Language check:** so the labels show up in your language, it reads your system language once per chat
with one harmless system command – `defaults read -g AppleLanguages` on a Mac,
`(Get-Culture).TwoLetterISOLanguageName` in PowerShell on Windows. Nothing else is read.

> [!WARNING]
> **Early version – updates will come.** This kind of extension is still brand new in Claude Code.
> After an update from Anthropic something may stop working until a fix lands here.
> With automatic updates on (below) you get the fix by itself.

## Updates

Turn it on once and forget it: type `/plugin` → **Marketplaces** → **nix-progress-bar** → turn on
automatic updates.

Or by hand, whenever you like:
```
/plugin marketplace update nix-progress-bar
```

### What's new

**2.2 – German and English.** The tool's own labels follow your system language: German on a
German system, English everywhere else – or pick it yourself with `/nix-progress-bar english`, `deutsch` or
`auto`. Other languages (e.g. Spanish) get the English labels – but everything Claude writes itself
(the steps, the thank-you, its answers) comes in your language anyway.

## Uninstall

```
/plugin uninstall nix-progress-bar@nix-progress-bar
```

## More from nikscz

- [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar) – Claude's plan as a checklist
- [nix-note](https://github.com/nikscz/nix-note) – project notes on the side with /note
- [nix-done-sound](https://github.com/nikscz/nix-done-sound) – your own alert sound when Claude is done

## License

[MIT](LICENSE) – use it, change it, pass it on, no warranty.

Made with Claudius, for Claudius. Found a bug or have an idea?
Open an [issue](https://github.com/nikscz/nix-progress-bar/issues).
