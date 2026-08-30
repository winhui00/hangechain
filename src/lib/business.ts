import { copy, type Locale } from '../content/site'
import { useLocale } from '../context/locale-context'

export type BusinessItem = {
  id?: string
  name: string
  nameEn?: string
  /** 首页 / 栏目页卡片短句 */
  card?: string
  text: string
  body?: string
  cta?: string
  ctaTo?: string
}

const SLUG_BY_NAME: Record<string, string> = {
  自有品牌: 'own',
  代理甄选: 'agency',
  集成仓配: 'warehouse',
  落地安装: 'install',
  智能设计: 'design',
  五恒智控: 'climate',
  'Own brands': 'own',
  'Agency selection': 'agency',
  'Integrated warehousing': 'warehouse',
  'On-site installation': 'install',
  'Intelligent design': 'design',
  'Five-constant climate': 'climate',
}

export function businessSlug(item: Pick<BusinessItem, 'id' | 'name'>) {
  if (item.id) return item.id
  const mapped = SLUG_BY_NAME[item.name]
  if (mapped) return mapped
  const fromName = String(item.name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return fromName || 'item'
}

export function businessPath(item: Pick<BusinessItem, 'id' | 'name'>) {
  return `/business/${businessSlug(item)}`
}

export function mergeBusinessItems(base: readonly BusinessItem[], overlay?: readonly BusinessItem[]) {
  if (!overlay?.length) return [...base]
  return overlay.map((item, i) => {
    const bundled =
      base.find((b) => (item.id && b.id === item.id) || b.name === item.name) || base[i]
    return {
      ...bundled,
      ...item,
      id: item.id || bundled?.id,
      body: item.body || bundled?.body,
      card: item.card || bundled?.card,
      cta: item.cta || bundled?.cta,
      ctaTo: item.ctaTo || bundled?.ctaTo,
    }
  })
}

export function useBusinessItems() {
  const { locale, t } = useLocale()
  const bundled = copy[locale as Locale].business.items
  return mergeBusinessItems(bundled, t.business.items)
}

export function findBusinessItem(items: BusinessItem[] | undefined, slug?: string) {
  if (!slug || !items?.length) return undefined
  return items.find((item) => businessSlug(item) === slug)
}

export function paras(text: unknown) {
  const raw = Array.isArray(text) ? text.join('\n') : String(text || '')
  return raw
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function parseBusinessBody(body?: string, fallback = '') {
  const raw = String(body || fallback || '').trim()
  if (!raw) return []
  if (!raw.includes('【')) {
    return [{ name: '', text: raw }]
  }
  const chunks = raw.split(/【([^】]+)】/)
  const out: { name: string; text: string }[] = []
  for (let i = 1; i < chunks.length; i += 2) {
    const name = chunks[i].trim()
    const text = (chunks[i + 1] || '').trim()
    if (name || text) out.push({ name, text })
  }
  return out.length ? out : [{ name: '', text: raw }]
}
