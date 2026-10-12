// Schätzung aus der Checkliste: wie lange die offenen Schritte wohl noch brauchen.
// Reine Rechnerei ohne $, damit sie sich leicht testen lässt. Alle Zeiten in ms;
// "effektiv" heißt: ohne die Zeit, in der Claude auf den Nutzer gewartet hat.

import type { ChecklistItem, StepKind, StepSample, ToolMark, Wait } from '../types'

export const DEFAULT_STEP_MS = 20_000
export const DEFAULT_FINAL_MS = 8_000
const MIN_LEFT_MS = 2_000
const KIND_MIN_SAMPLES = 3

export function median(values: readonly number[]): number | undefined {
  if (values.length === 0) return undefined
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2
}

/** Wartezeit innerhalb [from, to]; eine offene Wartezeit läuft bis to */
export function waitedMs(waits: readonly Wait[], from: number, to: number): number {
  let sum = 0
  for (const w of waits) {
    const a = Math.max(from, w.from)
    const b = Math.min(to, w.to ?? to)
    if (b > a) sum += b - a
  }
  return sum
}

/** Art eines Zeitraums nach den Werkzeugen darin: Agenten vor Internet vor Dateien vor Terminal */
export function stepKind(marks: readonly ToolMark[], from: number, to: number): StepKind {
  const cats = new Set(marks.filter(m => m.at >= from && m.at <= to).flatMap(m => m.cats))
  for (const kind of ['agent', 'web', 'dateien', 'terminal'] as const) if (cats.has(kind)) return kind
  return 'denken'
}

type TurnPlan = {
  steps: ChecklistItem[]
  final: ChecklistItem | undefined
  doneThisTurn: ChecklistItem[]
}

/** Der laufende Plan, wenn er zu diesem Turn gehört: noch etwas offen oder in diesem Turn abgehakt */
export function turnPlan(items: readonly ChecklistItem[], startedAt: number): TurnPlan | null {
  const current = items.filter(one => !one.isPast)
  const steps = current.filter(one => !one.isFinal)
  const final = current.find(one => one.isFinal)
  if (steps.length === 0) return null
  const doneThisTurn = steps
    .filter(one => one.status === 'completed' && (one.doneAt ?? 0) >= startedAt)
    .sort((a, b) => (a.doneAt ?? 0) - (b.doneAt ?? 0))
  const isOpen = current.some(one => one.status !== 'completed')
  if (!isOpen && doneThisTurn.length === 0) return null
  return { steps, final, doneThisTurn }
}

type EstimateInput = {
  items: readonly ChecklistItem[]
  startedAt: number
  now: number
  waits: readonly Wait[]
  marks: readonly ToolMark[]
  stepSamples: readonly StepSample[]
  finalSamples: readonly number[]
}

/** Geschätzte effektive Gesamtdauer des Turns, oder null ohne passenden Plan */
export function planEstimate(input: EstimateInput): number | null {
  const { items, startedAt, now, waits, marks, stepSamples, finalSamples } = input
  const plan = turnPlan(items, startedAt)
  if (!plan) return null
  const eff = (t: number) => t - startedAt - waitedMs(waits, startedAt, t)
  const effNow = eff(now)
  const done = plan.doneThisTurn
  const lastAt = done.length === 0 ? startedAt : (done[done.length - 1]?.doneAt ?? startedAt)
  const inStep = effNow - eff(lastAt)

  // Typische Schrittdauer: gelernt, angepasst an das Tempo dieses Turns, sobald ein Schritt fertig ist
  const typical = median(stepSamples.map(s => s.ms)) ?? DEFAULT_STEP_MS
  const pace = done.length === 0 ? typical : eff(lastAt) / done.length
  const stepMs = (pace * done.length + typical * 2) / (done.length + 2)
  const finalMs = median(finalSamples) ?? DEFAULT_FINAL_MS

  const open = plan.steps.filter(one => one.status !== 'completed')
  const finalOpen = plan.final !== undefined && plan.final.status !== 'completed'
  if (open.length === 0) {
    return effNow + (finalOpen ? Math.max(MIN_LEFT_MS, finalMs - inStep) : MIN_LEFT_MS)
  }

  // Der laufende Schritt: nach seiner Art, wenn es dafür genug gelernte Werte gibt
  const kind = stepKind(marks, lastAt, now)
  const sameKind = stepSamples.filter(s => s.kind === kind).map(s => s.ms)
  const expected = sameKind.length >= KIND_MIN_SAMPLES ? (median(sameKind) ?? stepMs) : stepMs
  const current = Math.max(MIN_LEFT_MS, expected - inStep)
  return effNow + current + (open.length - 1) * stepMs + (finalOpen ? finalMs : 0)
}

/** Am Ende des Turns: Dauer und Art jedes abgehakten Schritts und des Schlussschritts */
export function learnSteps(
  items: readonly ChecklistItem[],
  startedAt: number,
  endAt: number,
  waits: readonly Wait[],
  marks: readonly ToolMark[],
): { steps: StepSample[]; finalMs: number | null } {
  const plan = turnPlan(items, startedAt)
  if (!plan) return { steps: [], finalMs: null }
  const steps: StepSample[] = []
  let prev = startedAt
  for (const one of plan.doneThisTurn) {
    const at = one.doneAt ?? prev
    const ms = at - prev - waitedMs(waits, prev, at)
    if (ms > 500) steps.push({ ms, kind: stepKind(marks, prev, at) })
    prev = at
  }
  const allDone = plan.steps.every(one => one.status === 'completed')
  const finalMs = allDone && plan.doneThisTurn.length > 0 ? endAt - prev - waitedMs(waits, prev, endAt) : null
  return { steps, finalMs: finalMs !== null && finalMs > 0 ? finalMs : null }
}
