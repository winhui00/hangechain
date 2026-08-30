import { useEffect } from 'react'
import { useCms } from './content/cms'
import { useLocale } from './context/locale-context'

export function usePageTitle(page: string) {
  const { locale, t } = useLocale()
  const { snapshot } = useCms()

  useEffect(() => {
    const seoTitle = snapshot?.seo?.title
    if (page === t.siteTitle && seoTitle) {
      document.title = seoTitle
      return
    }
    document.title = page === t.siteTitle ? t.siteTitle : `${page} · ${t.siteTitle}`
  }, [locale, page, snapshot?.seo?.title, t.siteTitle])
}
