// The system's language, German or English. The mods' own environment always reports
// en-US, so the system itself is asked (in register, where $ lives).

export type Lang = 'de' | 'en'

/** Commands that print the system language: Mac first, then Windows */
export const ASK_LANG: readonly (readonly string[])[] = [
  ['defaults', 'read', '-g', 'AppleLanguages'], // ( "de-DE", "en-DE" )
  ['powershell', '-NoProfile', '-Command', '(Get-Culture).TwoLetterISOLanguageName'], // de
]

/** The first language code in a command's output or a LANG value; null when there is none */
export function langOf(text: string): Lang | null {
  const code = text.match(/[a-z]{2}/i)?.[0]?.toLowerCase()
  return code === undefined ? null : code === 'de' ? 'de' : 'en'
}
