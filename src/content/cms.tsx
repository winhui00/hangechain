import { contactFromCoop, isCoopPage } from '../lib/places'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  legalPrivacy as bundledPrivacy,
  legalSettings as bundledSettings,
  legalTabs as bundledTabs,
  legalTerms as bundledTerms,
} from './legal'
import {
  brands as bundledBrands,
  contact as bundledContact,
  copy as bundledCopy,
  jobs as bundledJobs,
  navGroups as bundledNav,
  type Brand,
  type Job,
} from './site'

export type { Job }

export type ExtraPlace = {
  id: string
  title?: string
  titleEn?: string
  address?: string
  addressEn?: string
  note?: string
  lat?: string
  lng?: string
  mapName?: string
  mapAddress?: string
  mapEmbed?: string
  imageKey?: string
  kind?: string
}

export type ExtraContactItem = {
  label?: string
  labelEn?: string
  value?: string
  href?: string
}

export type ExtraPage = {
  id: string
  path: string
  zh: string
  en: string
  kicker?: string
  title?: string
  lead?: string
  body?: string[]
  places?: ExtraPlace[]
  placesTitle?: string
  placesTitleEn?: string
  warehouses?: ExtraPlace[]
  warehousesTitle?: string
  warehousesTitleEn?: string
  contacts?: ExtraContactItem[]
  contactTitle?: string
  contactTitleEn?: string
}

const bundledExtraPages: ExtraPage[] = [
  {
    id: 'page-mtemc5ka',
    path: '/p/page-mtemc5ka',
    zh: '商务合作',
    en: 'Business',
    kicker: '何从接洽',
    title: '商务合作',
    lead: '圣人不积，既以为人己愈有，既以与人己愈多。               ——《道德经》第八十一章',
    body: [''],
    placesTitle: '商务地址',
    placesTitleEn: 'Business address',
    warehousesTitle: '仓储基地',
    warehousesTitleEn: 'Warehouse',
    contactTitle: '商务联系',
    contactTitleEn: 'Business contact',
    places: [
      {
        id: 'office',
        title: '长沙',
        titleEn: 'Changsha',
        address: bundledContact.officeZh,
        addressEn: bundledContact.officeEn,
        lat: bundledContact.officeLat,
        lng: bundledContact.officeLng,
        mapName: '长沙市天心区万家丽南路辅路',
        mapAddress: '暮云街道汇金路与万家丽南路交汇处',
        note: '海伦堡·爱ME城市',
        imageKey: 'extra.page-mtemc5ka.office',
      },
    ],
    warehouses: [
      {
        id: 'warehouse',
        title: '传化公路港',
        titleEn: 'Transfar Highway Port',
        address: bundledContact.warehouseZh,
        addressEn: bundledContact.warehouseEn,
        lat: bundledContact.warehouseLat,
        lng: bundledContact.warehouseLng,
        imageKey: 'extra.page-mtemc5ka.warehouse',
      },
    ],
    contacts: [
      { label: '邮箱', labelEn: 'Email', value: bundledContact.email, href: `mailto:${bundledContact.email}` },
      { label: '电话', labelEn: 'Phone', value: bundledContact.phone, href: `tel:${bundledContact.phone.replaceAll('-', '')}` },
    ],
  },
]

export type CmsImage = {
  url: string
  width?: number
  height?: number
  note?: string
}

export type CmsSnapshot = {
  content?: {
    copy?: Partial<typeof bundledCopy>
    brands?: Brand[]
    contact?: Partial<typeof bundledContact>
    navGroups?: typeof bundledNav
    extraPages?: ExtraPage[]
    jobs?: Job[]
    legal?: {
      tabs?: typeof bundledTabs
      terms?: typeof bundledTerms
      privacy?: typeof bundledPrivacy
      settings?: typeof bundledSettings
    }
  }
  images?: Record<string, CmsImage>
  seo?: Record<string, string>
  geo?: Record<string, string>
}

const CmsContext = createContext<{ snapshot: CmsSnapshot | null; ready: boolean }>({
  snapshot: null,
  ready: false,
})

function isPlain(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function deepMerge<T>(base: T, overlay: unknown): T {
  if (overlay === undefined || overlay === null) return base
  if (!isPlain(base) || !isPlain(overlay)) return overlay as T
  const next: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    next[key] = deepMerge((base as Record<string, unknown>)[key], value)
  }
  return next as T
}

function abs(base: string, data: CmsSnapshot): CmsSnapshot {
  const images: Record<string, CmsImage> = {}
  for (const [key, rec] of Object.entries(data.images || {})) {
    const url = rec?.url || ''
    images[key] = { ...rec, url: url.startsWith('http') ? url : base + url }
  }
  return { ...data, images }
}

export function cmsBase() {
  const env = import.meta.env.VITE_CMS_URL as string | undefined
  return env === undefined || env === '' ? '' : env.replace(/\/$/, '')
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<CmsSnapshot | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const base = cmsBase()
    fetch(`${base}/api/public/hangechain`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.content) setSnapshot(abs(base, data))
      })
      .catch(() => {})
      .finally(() => setReady(true))
  }, [])

  const value = useMemo(() => ({ snapshot, ready }), [snapshot, ready])
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

export function useCms() {
  return useContext(CmsContext)
}

export function useCmsCopy<L extends keyof typeof bundledCopy>(locale: L) {
  const { snapshot } = useCms()
  return useMemo(
    () => deepMerge(bundledCopy[locale], snapshot?.content?.copy?.[locale]),
    [locale, snapshot],
  )
}

export function useCmsContact() {
  const { snapshot } = useCms()
  const coop = (snapshot?.content?.extraPages || []).find(isCoopPage)
  return contactFromCoop({ ...bundledContact, ...snapshot?.content?.contact }, coop)
}

export function useCmsBrands() {
  const { snapshot } = useCms()
  const overlay = snapshot?.content?.brands
  const list = (overlay?.length ? overlay : bundledBrands).map((brand) => ({
    ...brand,
    kind: brand.kind === 'agency' ? 'agency' : 'own',
  })) as Brand[]
  if (list.some((brand) => brand.kind === 'agency')) return list
  const seen = new Set(list.map((brand) => brand.id))
  return [...list, ...bundledBrands.filter((brand) => brand.kind === 'agency' && !seen.has(brand.id))]
}

const HUB_PATHS = new Set(['/tech', '/platform'])

export function useCmsNav() {
  const { snapshot } = useCms()
  const nav = snapshot?.content?.navGroups
  const groups = nav?.length ? nav : bundledNav
  return groups.map((group) => ({
    ...group,
    children: (group.children || []).filter((child) => !HUB_PATHS.has(child.path)),
  }))
}

export function useCmsExtraPages() {
  const { snapshot } = useCms()
  const overlay = snapshot?.content?.extraPages
  return overlay?.length ? overlay : bundledExtraPages
}

export function useCmsJobs() {
  const { snapshot } = useCms()
  const overlay = snapshot?.content?.jobs
  const list = Array.isArray(overlay) ? overlay : bundledJobs
  return list.filter((job) => job.title || job.titleEn)
}

export function useCmsLegal() {
  const { snapshot } = useCms()
  const legal = snapshot?.content?.legal
  return {
    legalTabs: legal?.tabs?.length ? legal.tabs : bundledTabs,
    legalTerms: legal?.terms || bundledTerms,
    legalPrivacy: legal?.privacy || bundledPrivacy,
    legalSettings: legal?.settings || bundledSettings,
  }
}

export function useCmsImage(key: string, fallback: string) {
  const { snapshot } = useCms()
  return snapshot?.images?.[key]?.url || fallback
}

