import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../context/locale-context'
import { hubPath, type HubItem, type HubKind } from '../lib/hubs'

export function HubGrid({ kind, items }: { kind: HubKind; items: readonly HubItem[] }) {
  const { t } = useLocale()
  const shown = items.filter((item) => String(item.name || '').trim())

  if (!shown.length) return null

  return (
    <div className="fields">
      {shown.map((item, i) => (
        <Link className="field-card" key={hubPath(kind, item)} to={hubPath(kind, item)} style={{ '--i': i } as CSSProperties}>
          <h3>
            {item.name}
            <span className="cta-arrow">{t.arrow}</span>
          </h3>
          {item.card || item.text ? <p>{item.card || item.text}</p> : null}
        </Link>
      ))}
    </div>
  )
}
