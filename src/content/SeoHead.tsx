import { useEffect } from 'react'
import { useCms } from './cms'

function upsertMeta(attr: 'name' | 'property', key: string, value?: string) {
  if (!value) return
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function upsertLink(rel: string, href?: string, extra?: Record<string, string>) {
  if (!href) return
  const id = extra?.hreflang ? `link-${rel}-${extra.hreflang}` : `link-${rel}`
  let el = document.getElementById(id) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.id = id
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
  if (extra) {
    for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v)
  }
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function SeoHead() {
  const { snapshot } = useCms()

  useEffect(() => {
    if (!snapshot) return
    const seo = snapshot.seo || {}
    const geo = snapshot.geo || {}
    const images = snapshot.images || {}

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', seo.keywords)
    upsertMeta('name', 'robots', seo.robots)
    upsertMeta('name', 'geo.region', [geo.country, geo.region].filter(Boolean).join('-'))
    upsertMeta('name', 'geo.placename', geo.city)
    upsertMeta('name', 'geo.position', geo.lat && geo.lng ? `${geo.lat};${geo.lng}` : '')
    upsertMeta('name', 'ICBM', geo.lat && geo.lng ? `${geo.lat}, ${geo.lng}` : '')
    upsertMeta('property', 'og:title', seo.ogTitle || seo.title)
    upsertMeta('property', 'og:description', seo.ogDescription || seo.description)
    upsertMeta('property', 'og:url', seo.canonical)
    const ogImage = images[seo.ogImageKey || 'og']?.url
    if (ogImage) upsertMeta('property', 'og:image', ogImage)
    upsertLink('canonical', seo.canonical)

    const langs = String(geo.hreflang || '')
      .split(/[,，]/)
      .map((s) => s.trim())
      .filter(Boolean)
    for (const lang of langs) {
      upsertLink('alternate', seo.canonical || window.location.origin + '/', { hreflang: lang })
    }

    const icon = images.favicon?.url
    if (icon) {
      const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
      if (link) link.href = icon
    }

    const sameAs = String(geo.sameAs || '')
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean)

    upsertJsonLd('cms-geo-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: geo.aiEntity || seo.title,
      description: geo.aiSummary || seo.description,
      url: seo.canonical || undefined,
      sameAs: sameAs.length ? sameAs : undefined,
      areaServed: geo.serviceArea || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: geo.address || undefined,
        addressLocality: geo.city || undefined,
        addressRegion: geo.region || undefined,
        postalCode: geo.postalCode || undefined,
        addressCountry: geo.country || undefined,
      },
      geo:
        geo.lat && geo.lng
          ? { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng }
          : undefined,
    })

    if (seo.jsonLd) {
      try {
        upsertJsonLd('cms-custom-jsonld', JSON.parse(seo.jsonLd))
      } catch {
        upsertJsonLd('cms-custom-jsonld', { note: seo.jsonLd })
      }
    }
  }, [snapshot])

  return null
}
