import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { copy, type Locale } from '../content/site'
import { LocaleContext, type LocaleContextValue } from './locale-context'

const STORAGE_KEY = 'hangechain-locale'

function readStored(): Locale {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'en' || value === 'zh') return value
  } catch {
    /* ignore */
  }
  return 'zh'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStored)

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: copy[locale],
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
