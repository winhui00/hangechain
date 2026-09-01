import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useCmsCopy } from '../content/cms'
import { type Locale } from '../content/site'
import { LocaleContext, type LocaleContextValue } from './locale-context'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh')
  const t = useCmsCopy(locale)

  useEffect(() => {
    document.documentElement.lang = 'zh-CN'
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t,
    }),
    [locale, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
