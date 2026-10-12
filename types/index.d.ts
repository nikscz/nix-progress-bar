export type Category = 'dateien' | 'terminal' | 'web' | 'agent'

/** Grobe Klasse der Nutzer-Nachricht: Kurzfrage, normale Frage, Arbeitsauftrag */
export type PromptClass = 'kurz' | 'mittel' | 'lang'

export type Progress = {
  turnId: string
  startedAt: number
  now: number
  estimateMs: number
  /** Schätzung beim Start, für die Fehlerkorrektur am Ende */
  initialEstimateMs: number
  doneMs: number | null
  reason: string | null
  /** Kategorien der gerade laufenden Tools */
  active: Category[]
  /** Kategorien, die in diesem Turn schon benutzt wurden */
  used: Category[]
  /** Tokens des Turns, erst nach Abschluss bekannt */
  tokens: number | null
  /** Klasse der Nachricht, die den Turn gestartet hat */
  cls: PromptClass
  /** Ob in diesem Turn schon ein Werkzeug lief */
  toolSeen: boolean
  /** Ob die Schätzung als belastbar gilt (sonst grau) */
  firm: boolean
  /** Schätzung nur aus früheren Turns, als Rückfall und zum Mischen */
  histEstimateMs: number
  /** Wartezeiten auf den Nutzer; zählen nicht als Arbeitszeit */
  waits: Wait[]
  /** Werkzeugläufe dieses Turns */
  marks: ToolMark[]
}

export type TimeMode = 'dauer' | 'uhrzeit'

/** Eine Zeitspanne, in der Claude auf dich gewartet hat (Erlaubnis, Rückfrage); offen solange to null ist */
export type Wait = { from: number; to: number | null }

/** Wann ein Werkzeug welcher Art lief, um Schritte einer Art zuzuordnen */
export type ToolMark = { at: number; cats: Category[] }

/** Art eines Checklisten-Schritts nach den Werkzeugen darin; "denken" ohne Werkzeug */
export type StepKind = Category | 'denken'

/** Gelernte Dauer eines Schritts, ohne Wartezeit */
export type StepSample = { ms: number; kind: StepKind }

declare module 'claude-code' {
  interface PluginState {
    'nix-progress-bar': { progress: Progress | null; timeMode: TimeMode; isHidden: boolean }
  }
}

// Read from the nix-checklist-sidebar mod, when it is installed: its steps feed the bar's step line.
export type ChecklistItem = {
  id: string
  text: string
  status: 'pending' | 'in_progress' | 'completed'
  doneAt?: number
  isPast?: true
  isFinal?: true
}

declare module 'claude-code' {
  interface PluginState {
    'nix-checklist-sidebar': { items: ChecklistItem[] }
  }
}
