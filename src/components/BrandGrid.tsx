import { Fragment, useEffect, useState, type CSSProperties } from 'react'
import { useCms, useCmsBrands } from '../content/cms'
import type { BrandKind } from '../content/site'
import { useLocale } from '../context/locale-context'
import garmaLogo from '../assets/brands/garma-logo.jpg'
import bluemapleLogo from '../assets/brands/bluemaple-logo.jpg'
import sunjoyLogo from '../assets/brands/sunjoy-logo.png'
import wuenLogo from '../assets/brands/wuen-logo-white.png'
import hangeLogo from '../assets/brands/hange-logo.jpg'

type BrandLogo = {
  src: string
  lockup?: boolean
  wide?: boolean
  emblem?: boolean
  knockout?: boolean
  onDark?: boolean
}

/**
 * Source marks for homepage pop cards. Brand-page hover always runs
 * knockout + trim so every logo fills the same slot.
 */
const brandLogos: Record<string, BrandLogo> = {
  garma: { src: garmaLogo, knockout: true, onDark: true, wide: true },
  bluemaple: { src: bluemapleLogo, lockup: true },
  sunjoy: { src: sunjoyLogo, knockout: true, wide: true },
  wuen: { src: wuenLogo, knockout: true, emblem: true },
  hange: { src: hangeLogo, knockout: true, onDark: true, wide: true },
}

function lum(r: number, g: number, b: number) {
  return r * 0.3 + g * 0.59 + b * 0.11
}

function hexRgb(hex: string | undefined) {
  if (!hex) return null
  const m = hex.replace('#', '').trim()
  if (m.length !== 6) return null
  return { r: parseInt(m.slice(0, 2), 16), g: parseInt(m.slice(2, 4), 16), b: parseInt(m.slice(4, 6), 16) }
}

function markToWhite(img: HTMLImageElement, brandHex?: string) {
  const width = img.naturalWidth || img.width
  const height = img.naturalHeight || img.height
  if (!width || !height) return img.src
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return img.src
  ctx.drawImage(img, 0, 0)
  const image = ctx.getImageData(0, 0, width, height)
  const data = image.data
  const brand = hexRgb(brandHex)
  const total = width * height

  const inset = Math.max(2, Math.round(Math.min(width, height) * 0.05))
  const sample = (x0: number, y0: number, x1: number, y1: number) => {
    let r = 0
    let g = 0
    let b = 0
    let n = 0
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const i = (y * width + x) * 4
        if (data[i + 3] < 16) continue
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
        n++
      }
    }
    return n ? { r: r / n, g: g / n, b: b / n } : null
  }
  const corners = [
    sample(0, 0, inset, inset),
    sample(width - inset, 0, width, inset),
    sample(0, height - inset, inset, height),
    sample(width - inset, height - inset, width, height),
  ].filter(Boolean) as { r: number; g: number; b: number }[]
  const bg = corners.length
    ? {
        r: corners.reduce((s, c) => s + c.r, 0) / corners.length,
        g: corners.reduce((s, c) => s + c.g, 0) / corners.length,
        b: corners.reduce((s, c) => s + c.b, 0) / corners.length,
      }
    : null
  const bgLum = bg ? lum(bg.r, bg.g, bg.b) : null
  const lightBg = bgLum != null && bgLum > 198
  const darkBg = bgLum != null && bgLum < 90

  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>()
  let whiteish = 0
  let brandHits = 0
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 16) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (r > 220 && g > 220 && b > 220) {
      whiteish++
      continue
    }
    if (brand && Math.abs(r - brand.r) + Math.abs(g - brand.g) + Math.abs(b - brand.b) < 95) {
      brandHits++
    }
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4)
    const cur = buckets.get(key)
    if (cur) {
      cur.n++
      cur.r += r
      cur.g += g
      cur.b += b
    } else {
      buckets.set(key, { n: 1, r, g, b })
    }
  }
  let plate: { r: number; g: number; b: number } | null = null
  let plateN = 0
  for (const cur of buckets.values()) {
    if (cur.n > plateN) {
      plateN = cur.n
      plate = { r: cur.r / cur.n, g: cur.g / cur.n, b: cur.b / cur.n }
    }
  }
  // White-background marks (WUEN, Tomilake): the ink is the dominant
  // non-white color — never treat that as a plate. Colored-plate marks
  // (Greendmill): knock the plate, keep the white logo.
  const usePlate =
    !lightBg &&
    Boolean(plate) &&
    plateN / total > 0.16 &&
    whiteish / total > 0.04 &&
    lum(plate!.r, plate!.g, plate!.b) < 210
  const useBrandPlate =
    !lightBg && brandHits / total > 0.16 && whiteish / total > 0.04

  const distTo = (
    r: number,
    g: number,
    b: number,
    c: { r: number; g: number; b: number } | null,
  ) => (c ? Math.abs(r - c.r) + Math.abs(g - c.g) + Math.abs(b - c.b) : 999)

  const isPlate = (r: number, g: number, b: number, a: number) => {
    if (a < 18) return true
    const L = lum(r, g, b)
    const nearWhite = r > 228 && g > 228 && b > 228
    if (nearWhite && !lightBg) return false
    const dBg = distTo(r, g, b, bg)
    return (
      (lightBg && L > 198) ||
      (bg != null && !lightBg && dBg < 140) ||
      (darkBg && L < 70 && dBg < 180) ||
      (usePlate && distTo(r, g, b, plate) < 110) ||
      (useBrandPlate && distTo(r, g, b, brand) < 100)
    )
  }

  const seen = new Uint8Array(total)
  const stack: number[] = []
  const push = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const p = y * width + x
    if (seen[p]) return
    seen[p] = 1
    stack.push(p)
  }
  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }
  while (stack.length) {
    const p = stack.pop() as number
    const i = p * 4
    if (!isPlate(data[i], data[i + 1], data[i + 2], data[i + 3])) continue
    data[i + 3] = 0
    const x = p % width
    const y = (p / width) | 0
    push(x - 1, y)
    push(x + 1, y)
    push(x, y - 1)
    push(x, y + 1)
  }

  for (let i = 0; i < data.length; i += 4) {
    if (isPlate(data[i], data[i + 1], data[i + 2], data[i + 3])) {
      data[i + 3] = 0
    }
  }

  if (lightBg) {
    let opaque = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] >= 18) opaque++
    }
    if (opaque / total > 0.62) {
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 18) continue
        if (lum(data[i], data[i + 1], data[i + 2]) > 185) data[i + 3] = 0
      }
    }
  }

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 16) continue
    data[i] = 255
    data[i + 1] = 255
    data[i + 2] = 255
    data[i + 3] = 255
  }

  let minX = width
  let minY = height
  let maxX = 0
  let maxY = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] < 18) continue
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }
  if (maxX < minX) return img.src

  const pad = Math.max(4, Math.round(Math.max(maxX - minX + 1, maxY - minY + 1) * 0.06))
  minX = Math.max(0, minX - pad)
  minY = Math.max(0, minY - pad)
  maxX = Math.min(width - 1, maxX + pad)
  maxY = Math.min(height - 1, maxY + pad)
  const cw = maxX - minX + 1
  const ch = maxY - minY + 1
  ctx.putImageData(image, 0, 0)
  const out = document.createElement('canvas')
  out.width = cw
  out.height = ch
  const octx = out.getContext('2d')
  if (!octx) return img.src
  octx.putImageData(ctx.getImageData(minX, minY, cw, ch), 0, 0)
  return out.toDataURL('image/png')
}

function KnockoutImg({ src, brandColor }: { src: string; brandColor?: string }) {
  const [href, setHref] = useState(src)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    const abs = src.startsWith('http') || src.startsWith('//')
    if (abs) img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const next = markToWhite(img, brandColor)
        if (!cancelled) setHref(next)
      } catch {
        if (!cancelled) setHref(src)
      }
    }
    img.onerror = () => {
      if (!cancelled) setHref(src)
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src, brandColor])

  return <img src={href} alt="" />
}

function openHref(href: string | null) {
  if (!href) return undefined
  return href.replace(/^https:\/\//i, 'http://')
}

export function BrandMatrixGroup({ kind, intro = true }: { kind: BrandKind; intro?: boolean }) {
  const { t } = useLocale()
  const title = kind === 'own' ? t.brandsPage.ownTitle : t.brandsPage.agencyTitle
  const lead = kind === 'own' ? t.brandsPage.ownLead : t.brandsPage.agencyLead

  return (
    <div className="brand-group">
      {intro ? (
        <>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
        </>
      ) : null}
      <BrandGrid kind={kind} />
    </div>
  )
}

export function BrandGrid({
  variant = 'grid',
  kind,
}: {
  variant?: 'grid' | 'panels'
  kind?: BrandKind
}) {
  const { locale, t } = useLocale()
  const all = useCmsBrands()
  const want = variant === 'panels' ? 'own' : kind
  const brands = want ? all.filter((brand) => (brand.kind || 'own') === want) : all
  const { snapshot } = useCms()
  const panels = variant === 'panels'

  return (
    <div className={panels ? 'brand-rail' : 'grid-7'}>
      {brands.map((brand, index) => {
        const live = brand.status === 'live' && Boolean(brand.href)
        const className = [
          'brand-card',
          live ? 'is-live' : '',
          panels ? 'brand-panel' : '',
        ]
          .filter(Boolean)
          .join(' ')
        const style = { '--brand': brand.color, '--i': index } as CSSProperties
        const bundled = brandLogos[brand.id]
        const cmsSrc = snapshot?.images?.[`brand.${brand.id}`]?.url
        const cmsMark: BrandLogo | undefined = cmsSrc ? { src: cmsSrc } : undefined
        const panelLogo = bundled ?? cmsMark
        const floatLogo = bundled ?? cmsMark
        const logoMark = (opts?: { float?: boolean }) => {
          const float = Boolean(opts?.float)
          const logo = float ? floatLogo : panelLogo
          if (float) {
            return (
              <div className="brand-logo is-float">
                {logo?.src ? (
                  <KnockoutImg src={logo.src} brandColor={brand.color} />
                ) : (
                  <span className="brand-logo-type">{brand.logoEn ?? brand.nameEn}</span>
                )}
              </div>
            )
          }
          return (
            <div
              className={[
                'brand-logo',
                logo?.lockup && 'is-lockup',
                logo?.wide && 'is-wide',
                logo?.emblem && 'is-emblem',
                logo?.knockout && 'is-knockout',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {logo?.lockup ? (
                <>
                  <span
                    className="brand-logo-seal"
                    style={{ backgroundImage: `url(${logo.src})` }}
                  />
                  <span
                    className="brand-logo-word"
                    style={{ backgroundImage: `url(${logo.src})` }}
                  />
                </>
              ) : logo?.knockout ? (
                <KnockoutImg src={logo.src} brandColor={brand.color} />
              ) : logo ? (
                <img src={logo.src} alt="" />
              ) : (
                <span className="brand-logo-type">{brand.logoEn ?? brand.nameEn}</span>
              )}
            </div>
          )
        }

        const inner = panels ? (
          <div className="brand-copy">
            <div className="brand-name">{brand.nameEn}</div>
            <div className="brand-reveal">
              {logoMark()}
              <div className="brand-meta">
                <div className="brand-mark">{brand.nameZh}</div>
                <p className="brand-slogan">{brand.sloganZh}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="brand-card-main">
              <div>
                <div className="brand-name">{brand.nameZh}</div>
                {brand.nameEn !== brand.nameZh ? <div className="brand-local">{brand.nameEn}</div> : null}
              </div>
              <p className="brand-tag">{locale === 'zh' ? brand.taglineZh : brand.taglineEn}</p>
              {live ? (
                <span className="brand-link">{t.visit}</span>
              ) : (
                <span className="brand-link soon">{t.comingSoon}</span>
              )}
            </div>
            <div className="brand-card-float" aria-hidden="true">
              {logoMark({ float: true })}
            </div>
          </>
        )

        const card = live ? (
          <a
            className={className}
            data-brand={brand.id}
            style={style}
            href={openHref(brand.href)}
            target="_blank"
            rel="noreferrer"
          >
            {panels ? <span className="brand-sheen" aria-hidden="true" /> : null}
            {inner}
          </a>
        ) : (
          <article className={className} data-brand={brand.id} style={style}>
            {panels ? <span className="brand-sheen" aria-hidden="true" /> : null}
            {inner}
          </article>
        )

        return panels ? (
          <div className="brand-slot" key={brand.id}>
            {card}
          </div>
        ) : (
          <Fragment key={brand.id}>{card}</Fragment>
        )
      })}
    </div>
  )
}
