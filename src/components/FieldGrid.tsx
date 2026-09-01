import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../context/locale-context'
import { businessPath, useBusinessItems } from '../lib/business'

export function FieldGrid({ variant = 'cards' }: { variant?: 'cards' | 'index' }) {
  const { t } = useLocale()
  const biz = useBusinessItems()
  const fields = t.home.fields
  const items = biz.map((item, i) => {
    const homeCard = fields?.find((f) => f.name === item.name) || fields?.[i]
    return {
      ...item,
      text: item.card || homeCard?.text || item.text,
    }
  })
  const index = variant === 'index'

  return (
    <div className={index ? 'field-index' : 'fields'}>
      {items.map((item, i) => (
        <Link
          className={index ? 'field-index-item' : 'field-card'}
          key={businessPath(item)}
          to={businessPath(item)}
          style={{ '--i': i } as CSSProperties}
        >
          <h3>
            {item.name}
            {index ? null : <span className="cta-arrow">{t.arrow}</span>}
          </h3>
          {index ? <span className="cta-arrow">{t.arrow}</span> : null}
          <p>{item.text}</p>
        </Link>
      ))}
    </div>
  )
}
