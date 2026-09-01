import { type ExtraContactItem, type ExtraPage, type ExtraPlace } from '../content/cms'
import { contact as bundledContact } from '../content/site'

export type { ExtraContactItem, ExtraPlace }

type Contact = typeof bundledContact

function filledPlaces(list: ExtraPlace[] | undefined) {
  return (list || []).filter((p) => p.title || p.titleEn || p.address || p.addressEn || p.mapEmbed || p.lat)
}

function filledContacts(list: ExtraContactItem[] | undefined) {
  return (list || []).filter((c) => c.value)
}

export function isCoopPage(page: ExtraPage) {
  return /商务合作|business\s*coop/i.test(`${page.zh || ''}${page.title || ''}${page.en || ''}`)
}

function pickContact(list: ExtraContactItem[] | undefined, kind: 'email' | 'phone') {
  const rows = filledContacts(list)
  if (kind === 'email') {
    return rows.find((c) => /邮箱|email/i.test(`${c.label || ''}${c.labelEn || ''}`) || String(c.value || '').includes('@'))
  }
  return rows.find(
    (c) =>
      /电话|phone/i.test(`${c.label || ''}${c.labelEn || ''}`) ||
      /^[\d\s+()-]+$/.test(String(c.value || '')),
  )
}

/** Extra 商务合作 is the source of truth; 人力对接 / footer read the same fields. */
export function contactFromCoop(contact: Contact, page?: ExtraPage | null): Contact {
  if (!page) return contact
  const office = filledPlaces(page.places)[0]
  const warehouse = filledPlaces(page.warehouses)[0]
  const email = pickContact(page.contacts, 'email')
  const phone = pickContact(page.contacts, 'phone')
  return {
    ...contact,
    officeZh: office?.address || contact.officeZh,
    officeEn: office?.addressEn || contact.officeEn,
    officeLat: office?.lat || contact.officeLat,
    officeLng: office?.lng || contact.officeLng,
    warehouseZh: warehouse?.address || contact.warehouseZh,
    warehouseEn: warehouse?.addressEn || contact.warehouseEn,
    warehouseLat: warehouse?.lat || contact.warehouseLat,
    warehouseLng: warehouse?.lng || contact.warehouseLng,
    email: email?.value || contact.email,
    phone: phone?.value || contact.phone,
  }
}

function isWarehouse(place: ExtraPlace) {
  if (place.id === 'warehouse' || place.kind === 'warehouse') return true
  return /仓储|warehouse/i.test(`${place.title || ''}${place.titleEn || ''}`)
}

function asLocationName(place: ExtraPlace, zh: string, en: string) {
  if (place.title === '办公地址' || place.title === '商务地址') return { ...place, title: zh, titleEn: place.titleEn === 'Office' ? en : place.titleEn || en }
  if (place.title === '仓储基地') return { ...place, title: zh, titleEn: /warehouse/i.test(place.titleEn || '') ? en : place.titleEn || en }
  return place
}

export function resolvePlaceContent(page: ExtraPage, contact: Contact) {
  const contacts = filledContacts(page.contacts)
  let places = filledPlaces(page.places)
  let warehouses = filledPlaces(page.warehouses)
  if (!warehouses.length && places.some(isWarehouse)) {
    warehouses = places.filter(isWarehouse)
    places = places.filter((p) => !isWarehouse(p))
  }
  places = places.map((p) => asLocationName(p, '长沙', 'Changsha'))
  warehouses = warehouses.map((p) => asLocationName(p, '传化公路港', 'Transfar Highway Port'))

  const placesTitle = page.placesTitle || '商务地址'
  const placesTitleEn = page.placesTitleEn || 'Business address'
  const warehousesTitle = page.warehousesTitle || '仓储基地'
  const warehousesTitleEn = page.warehousesTitleEn || 'Warehouse'

  if (places.length || warehouses.length || contacts.length) {
    return {
      places,
      warehouses,
      placesTitle,
      placesTitleEn,
      warehousesTitle,
      warehousesTitleEn,
      contacts,
      contactTitle: page.contactTitle || '商务联系',
      contactTitleEn: page.contactTitleEn || 'Business contact',
      contactImageKey: `extra.${page.id}.contact`,
    }
  }
  if (!isCoopPage(page)) {
    return {
      places: [],
      warehouses: [],
      placesTitle,
      placesTitleEn,
      warehousesTitle,
      warehousesTitleEn,
      contacts: [],
      contactTitle: '',
      contactTitleEn: '',
      contactImageKey: '',
    }
  }
  return {
    places: [
      {
        id: 'office',
        title: '长沙',
        titleEn: 'Changsha',
        address: contact.officeZh,
        addressEn: contact.officeEn,
        lat: contact.officeLat,
        lng: contact.officeLng,
        mapName: '长沙市天心区万家丽南路辅路',
        mapAddress: '暮云街道汇金路与万家丽南路交汇处',
        imageKey: `extra.${page.id}.office`,
      },
    ] satisfies ExtraPlace[],
    warehouses: [
      {
        id: 'warehouse',
        title: '传化公路港',
        titleEn: 'Transfar Highway Port',
        address: contact.warehouseZh,
        addressEn: contact.warehouseEn,
        lat: contact.warehouseLat,
        lng: contact.warehouseLng,
        imageKey: `extra.${page.id}.warehouse`,
      },
    ] satisfies ExtraPlace[],
    placesTitle,
    placesTitleEn,
    warehousesTitle,
    warehousesTitleEn,
    contacts: [
      {
        label: '邮箱',
        labelEn: 'Email',
        value: contact.email,
        href: `mailto:${contact.email}`,
      },
      {
        label: '电话',
        labelEn: 'Phone',
        value: contact.phone,
        href: `tel:${contact.phone.replaceAll('-', '')}`,
      },
    ] satisfies ExtraContactItem[],
    contactTitle: page.contactTitle || '商务联系',
    contactTitleEn: page.contactTitleEn || 'Business contact',
    contactImageKey: `extra.${page.id}.contact`,
  }
}

export function parseCoord(value: string | undefined) {
  const n = Number(String(value || '').trim())
  return Number.isFinite(n) && Math.abs(n) > 0.01 ? n : null
}

export function contactHref(item: ExtraContactItem) {
  if (item.href) return item.href
  const value = String(item.value || '').trim()
  if (!value) return ''
  if (value.includes('@')) return `mailto:${value}`
  if (/^[\d\s+()-]+$/.test(value) && value.replace(/\D/g, '').length >= 8) {
    return `tel:${value.replace(/[^\d+]/g, '')}`
  }
  return ''
}

export function mapLinks(lat: number | null, lng: number | null, name: string, address: string) {
  const label = name || address || '目的地'
  if (lat != null && lng != null) {
    const q = new URLSearchParams({
      to: `${lng},${lat},${label}`,
      mode: 'car',
      src: 'hangechain',
      coordinate: 'gaode',
      callnative: '1',
    })
    const marker = new URLSearchParams({
      position: `${lng},${lat}`,
      name: label,
      src: 'hangechain',
      coordinate: 'gaode',
      callnative: '1',
    })
    return {
      navigate: `https://uri.amap.com/navigation?${q}`,
      open: `https://uri.amap.com/marker?${marker}`,
    }
  }
  const keyword = address || name
  return {
    navigate: `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}&src=hangechain`,
    open: `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}&src=hangechain`,
  }
}
