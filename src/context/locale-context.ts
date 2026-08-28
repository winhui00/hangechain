import { createContext, useContext } from 'react'
import { copy, type Locale } from '../content/site'

export type Copy = (typeof copy)[Locale]

export type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Copy
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
