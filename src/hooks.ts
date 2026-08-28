import { useEffect } from 'react'
import { pageTitle } from './content/site'
import { useLocale } from './context/locale-context'

export function usePageTitle(page: string) {
  const { locale } = useLocale()

  useEffect(() => {
    document.title = pageTitle(locale, page)
  }, [locale, page])
}
