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

/** A language the person picks by hand ("english", "deutsch", …); "auto" means the system's; null when it is neither */
export function chosenLang(word: string): Lang | 'auto' | null {
  const w = word.trim().toLowerCase()
  if (['english', 'englisch', 'en'].includes(w)) return 'en'
  if (['deutsch', 'german', 'de'].includes(w)) return 'de'
  if (['auto', 'system'].includes(w)) return 'auto'
  return null
}

/** The answer to a language switch, in the language just chosen */
export const SWITCHED: Record<Lang | 'auto', Record<Lang, string>> = {
  en: { en: 'Now in English.', de: 'Now in English.' },
  de: { en: 'Jetzt auf Deutsch.', de: 'Jetzt auf Deutsch.' },
  auto: { en: 'Follows the system language again.', de: 'Folgt wieder der Systemsprache.' },
}
