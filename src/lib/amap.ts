export type AmapParsed = {
  embed: string
  lng?: string
  lat?: string
  mapName?: string
  mapAddress?: string
  zoom?: string
}

export function parseAmapInput(raw: string): AmapParsed | null {
  const text = String(raw || '').trim()
  if (!text) return null
  let src = text
  const iframe = text.match(/src\s*=\s*["']([^"']+)["']/i)
  if (iframe) src = iframe[1]
  src = src.replace(/&amp;/g, '&')
  try {
    const u = new URL(src)
    if (!/(^|\.)amap\.com$/i.test(u.hostname)) return { embed: src }
    const q = u.searchParams
    return {
      embed: src,
      lng: q.get('lng') || undefined,
      lat: q.get('lat') || undefined,
      mapName: q.get('name') || undefined,
      mapAddress: q.get('address') || undefined,
      zoom: q.get('zoom') || undefined,
    }
  } catch {
    return null
  }
}

export function amapEmbedSrc(lat: number, lng: number, name: string, address: string, zoom = 16) {
  const q = new URLSearchParams({
    name: name || address || '位置',
    lng: String(lng),
    lat: String(lat),
    address: address || name || '',
    zoom: String(zoom),
    source: 'contextMenu',
    platform: 'pc',
  })
  return `https://ditu.amap.com/ssr/embed/place?${q}`
}

export function placeMapSrc(
  place: {
    mapEmbed?: string
    lat?: string
    lng?: string
    mapName?: string
    mapAddress?: string
    title?: string
    address?: string
  },
  zoom = 16,
) {
  const parsed = parseAmapInput(place.mapEmbed || '')
  if (parsed?.embed && /amap\.com/i.test(parsed.embed)) return parsed.embed
  const lat = Number(String(place.lat || '').trim())
  const lng = Number(String(place.lng || '').trim())
  if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) > 0.01 && Math.abs(lng) > 0.01) {
    return amapEmbedSrc(lat, lng, place.mapName || place.title || '', place.mapAddress || place.address || '', zoom)
  }
  return ''
}
