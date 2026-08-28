import type { CSSProperties } from 'react'
import { brands } from '../content/site'
import { useLocale } from '../context/locale-context'

export function BrandGrid({ variant = 'grid' }: { variant?: 'grid' | 'panels' }) {
  const { locale, t } = useLocale()
  const panels = variant === 'panels'

  return (
    <div className={panels ? 'brand-rail' : 'grid-7'}>
      {brands.map((brand) => {
        const live = brand.status === 'live' && Boolean(brand.href)
        const className = [
          'brand-card',
          live ? 'is-live' : '',
          panels ? 'brand-panel' : '',
        ]
          .filter(Boolean)
          .join(' ')
        const style = { '--brand': brand.color } as CSSProperties
        const inner = panels ? (
          <>
            <img className="brand-photo" src="/hangechain-hero.png" alt="" />
            <span className="brand-shade" aria-hidden />
            <span className="brand-tint" aria-hidden />
            <div className="brand-copy">
              <div className="brand-name">{brand.nameEn}</div>
              <div className="brand-reveal">
                {brand.nameZh !== brand.nameEn ? <div className="brand-local">{brand.nameZh}</div> : null}
                <p className="brand-tag">{locale === 'zh' ? brand.taglineZh : brand.taglineEn}</p>
                {live ? (
                  <span className="brand-link">{t.visit}</span>
                ) : (
                  <span className="brand-link soon">{t.comingSoon}</span>
                )}
              </div>
            </div>
          </>
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

        if (live) {
          return (
            <a
              key={brand.id}
              className={className}
              data-brand={brand.id}
              style={style}
              href={brand.href ?? undefined}
              target="_blank"
              rel="noreferrer"
            >
              {inner}
            </a>
          )
        }

        return (
          <article key={brand.id} className={className} data-brand={brand.id} style={style}>
            {inner}
          </article>
        )
      })}
    </div>
  )
}
