import { expect, mock, test } from 'claude-code/testing'

import type { ChecklistItem } from '../types'
import { learnSteps, planEstimate, stepKind, waitedMs } from './plan'

const S = 1_000
const T0 = 1_000_000
const item = (text: string, status: ChecklistItem['status'], doneAt?: number): ChecklistItem => ({
  id: text,
  text,
  status,
  ...(doneAt === undefined ? {} : { doneAt }),
})
const final = (status: ChecklistItem['status']): ChecklistItem => ({ id: 'f', text: 'Ergebnis ausgeben', status, isFinal: true })
const base = { startedAt: T0, waits: [], marks: [], stepSamples: [], finalSamples: [] }

test('waiting time is cut out, an open wait runs until now', () => {
  expect(waitedMs([{ from: T0 + 10 * S, to: T0 + 25 * S }], T0, T0 + 60 * S)).toBe(15 * S)
  expect(waitedMs([{ from: T0 + 50 * S, to: null }], T0, T0 + 60 * S)).toBe(10 * S)
})

test('a step is of the kind of its tools', () => {
  const marks = [{ at: T0 + S, cats: ['terminal' as const] }, { at: T0 + 2 * S, cats: ['web' as const] }]
  expect(stepKind(marks, T0, T0 + 3 * S)).toBe('web')
  expect(stepKind(marks, T0 + 5 * S, T0 + 9 * S)).toBe('denken')
})

test('the size of the plan sets the first estimate', () => {
  const small = planEstimate({ ...base, now: T0, items: [item('a', 'in_progress'), final('pending')] })
  const big = planEstimate({ ...base, now: T0, items: [item('a', 'in_progress'), ...'bcdef'.split('').map(t => item(t, 'pending')), final('pending')] })
  // 1 step + closing step = 28 s, 6 steps + closing step = 128 s
  expect(small).toBe(28 * S)
  expect(big).toBe(128 * S)
})

test('the pace of finished steps drives the rest', () => {
  // Two steps took 60 s each, much slower than the default 20 s: the rest is expected slower too
  const items = [item('a', 'completed', T0 + 60 * S), item('b', 'completed', T0 + 120 * S), item('c', 'in_progress'), item('d', 'pending'), final('pending')]
  const est = planEstimate({ ...base, now: T0 + 120 * S, items }) ?? 0
  // pace 60 s, blended with 20 s twice: 40 s per step -> 120 + 40 + 40 + 8
  expect(est).toBe(208 * S)
})

test('waiting for the user does not count as work', () => {
  const items = [item('a', 'in_progress'), final('pending')]
  const waits = [{ from: T0 + 5 * S, to: T0 + 65 * S }]
  expect(planEstimate({ ...base, now: T0 + 70 * S, items, waits })).toBe(28 * S)
})

test('learned durations of a kind are used for the running step', () => {
  const stepSamples = [1, 2, 3].map(() => ({ ms: 90 * S, kind: 'web' as const }))
  const marks = [{ at: T0 + S, cats: ['web' as const] }]
  const items = [item('a', 'in_progress'), final('pending')]
  // web steps took 90 s: the running web step is expected to need 90 s, plus the closing step
  expect(planEstimate({ ...base, now: T0 + 2 * S, items, marks, stepSamples })).toBe(2 * S + 88 * S + 8 * S)
})

test('a plan of an earlier turn is ignored', () => {
  const items = [item('a', 'completed', T0 - 50 * S), final('completed')]
  expect(planEstimate({ ...base, now: T0 + S, items })).toBeNull()
})

test('at the end each step is learned without waiting, with its kind', () => {
  const items = [item('a', 'completed', T0 + 30 * S), item('b', 'completed', T0 + 100 * S), final('in_progress')]
  const waits = [{ from: T0 + 40 * S, to: T0 + 60 * S }]
  const marks = [{ at: T0 + 50 * S, cats: ['web' as const] }]
  const learned = learnSteps(items, T0, T0 + 110 * S, waits, marks)
  expect(learned.steps).toEqual([
    { ms: 30 * S, kind: 'denken' },
    { ms: 50 * S, kind: 'web' },
  ])
  expect(learned.finalMs).toBe(10 * S)
})

test('the bar draws with old progress data and without a checklist', async ($, on) => {
  mock.clock(on, { now: T0 })
  mock.store(on)
  on('turn.start', (_, e) => ({ turnId: e.turnId }))
  for (const surface of ['terminal', 'desktop'] as const) {
    await $.turn.start({ text: 'bau mir eine Seite mit Kontaktformular und Galerie', turnId: `t-${surface}` })
    const ui = await $.ui.mount({
      plugin: 'nix-progress-bar',
      surface,
      component: 'AbovePrompt',
      props: { hasSurvey: false, bodyColumns: 80 } as never,
    })
    expect(await ui.find({ type: 'Text' })).toBeDefined()
    await ui.unmount()
  }
})

test('the command hides the bar and shows it again', async ($, on) => {
  mock.clock(on, { now: T0 })
  mock.store(on)
  on('turn.start', (_, e) => ({ turnId: e.turnId }))
  on('ui.render', () => ({ tree: null }) as never)
  // A German Mac
  on('process.run', () => ({ value: { exitCode: 0, stdout: '(\n    "de-DE"\n)', stderr: '' } }) as never)
  const run = async () => (await $.command.run({ command: 'nix-progress-bar', args: '' } as never)).text
  expect(await run()).toBe('Fortschrittsleiste ausgeblendet.')
  expect(await run()).toBe('Fortschrittsleiste eingeblendet.')
})

test('on an English system the command answers in English', async ($, on) => {
  mock.store(on)
  const run = async () => (await $.command.run({ command: 'nix-progress-bar', args: '' } as never)).text
  expect(await run()).toBe('Progress bar hidden.')
})
