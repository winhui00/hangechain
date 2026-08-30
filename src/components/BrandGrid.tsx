import { Fragment, useEffect, useState, type CSSProperties } from 'react'
import { useCms, useCmsBrands } from '../content/cms'
import type { BrandKind } from '../content/site'
import { useLocale } from '../context/locale-context'
import garmaLogo from '../assets/brands/garma-logo.jpg'
import bluemapleLogo from '../assets/brands/bluemaple-logo.jpg'
import sunjoyLogo from '../assets/brands/sunjoy-logo.png'
import wuenLogo from '../assets/brands/wuen-logo.jpg'
import hangeLogo from '../assets/brands/hange-logo.jpg'

type BrandLogo = {
  src: string
  lockup?: boolean
  wide?: boolean
  emblem?: boolean
  knockout?: boolean
  onDark?: boolean
}

const brandLogos: Record<string, BrandLogo> = {
  garma: { src: garmaLogo, knockout: true, onDark: true },
  bluemaple: { src: bluemapleLogo, lockup: true },
  sunjoy: { src: sunjoyLogo, wide: true, knockout: true },
  wuen: { src: wuenLogo, emblem: true, knockout: true },
  hange: { src: hangeLogo, wide: true, knockout: true, onDark: true },
}

function KnockoutImg({ src, onDark = false }: { src: string; onDark?: boolean }) {
  const [href, setHref] = useState(src)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = image.data
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3]
        if (alpha < 16) {
          data[i + 3] = 0
          continue
        }
        const lum = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11
        const isBg = onDark ? lum < 128 : lum > 232
        if (isBg) {
          data[i + 3] = 0
        } else {
          data[i] = 255
          data[i + 1] = 255
          data[i + 2] = 255
          data[i + 3] = 255
        }
      }
      ctx.putImageData(image, 0, 0)
      if (!cancelled) setHref(canvas.toDataURL('image/png'))
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src, onDark])

  return <img src={href} alt="" />
}

function openHref(href: string | null) {
  if (!href) return undefined
  return href.replace(/^https:\/\//i, 'http://')
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
        const logo = bundled || cmsSrc ? { ...(bundled || { src: cmsSrc || '' }), src: cmsSrc || bundled?.src || '' } : undefined
        const inner = panels ? (
          <div className="brand-copy">
            <div className="brand-name">{brand.nameEn}</div>
            <div className="brand-reveal">
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
                  <KnockoutImg src={logo.src} onDark={Boolean(logo.onDark)} />
                ) : logo ? (
                  <img src={logo.src} alt="" />
                ) : (
                  <span className="brand-logo-type">{brand.logoEn ?? brand.nameEn}</span>
                )}
              </div>
              <div className="brand-meta">
                <div className="brand-mark">{brand.nameZh}</div>
                <p className="brand-slogan">{brand.sloganZh}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="brand-name">{brand.nameEn}</div>
              {brand.nameZh !== brand.nameEn ? <div className="brand-local">{brand.nameZh}</div> : null}
            </div>
            <p className="brand-tag">{locale === 'zh' ? brand.taglineZh : brand.taglineEn}</p>
            {live ? (
              <span className="brand-link">{t.visit}</span>
            ) : (
              <span className="brand-link soon">{t.comingSoon}</span>
            )}
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
