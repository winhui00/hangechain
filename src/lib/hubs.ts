import { useLocale } from '../context/locale-context'

export type HubKind = 'tech' | 'platform'

export type HubItem = {
  id?: string
  name: string
  card?: string
  text?: string
  body?: string
  cta?: string
  ctaTo?: string
}

export type HubCopy = {
  title: string
  kicker: string
  lead: string
  back: string
  items: readonly HubItem[]
}

export function hubSlug(item: Pick<HubItem, 'id' | 'name'>) {
  if (item.id) return String(item.id).replace(/^\/+|\/+$/g, '')
  const fromName = String(item.name || '')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '')
  return fromName || 'item'
}

export function hubPath(kind: HubKind, item: Pick<HubItem, 'id' | 'name'>) {
  return `/${kind}/${hubSlug(item)}`
}

export function useHub(kind: HubKind): HubCopy {
  const { t } = useLocale()
  const overlay = (t as unknown as Record<HubKind, HubCopy>)[kind]
  return {
    title: overlay?.title || '',
    kicker: overlay?.kicker || '',
    lead: overlay?.lead ?? '',
    back: overlay?.back || '',
    items: [...(overlay?.items || [])],
  }
}

export function findHubItem(items: readonly HubItem[] | undefined, slug?: string) {
  if (!slug || !items?.length) return undefined
  return items.find((item) => hubSlug(item) === slug)
}
