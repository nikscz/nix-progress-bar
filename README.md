🇩🇪 [Deutsch](README.de.md)

# nix progress-bar

**How long will Claude take? A slim bar above the message box tells you.**

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
- Follows your system language (German or English).

| Command | What happens |
|---|---|
| `/nix-progress-bar` | hides the bar and shows it again |

### Add-on: nix-checklist-sidebar

With [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar) the bar shows Claude's
steps as **pills**, and the estimate follows the pace of the steps already done – much more precise.
Without the add-on the bar works just the same, only without pills.

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

## Uninstall

```
/plugin uninstall nix-progress-bar@nix-progress-bar
```

## More from nix

- [nix-checklist-sidebar](https://github.com/nikscz/nix-checklist-sidebar) – Claude's plan as a checklist
- [nix-note](https://github.com/nikscz/nix-note) – project notes on the side with /note
- [nix-done-sound](https://github.com/nikscz/nix-done-sound) – your own alert sound when Claude is done

## License

[MIT](LICENSE) – use it, change it, pass it on, no warranty.

Made with Claudius, for Claudius. Found a bug or have an idea?
Open an [issue](https://github.com/nikscz/nix-progress-bar/issues).
