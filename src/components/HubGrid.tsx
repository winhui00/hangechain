import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../context/locale-context'
import { hubCardHref, hubPath, isOffsiteHref, type HubItem, type HubKind } from '../lib/hubs'

function CardBody({ item }: { item: HubItem }) {
  const { t } = useLocale()
  return (
    <>
      <h3>
        {item.name}
        <span className="cta-arrow">{t.arrow}</span>
      </h3>
      {item.card || item.text ? <p>{item.card || item.text}</p> : null}
    </>
  )
}

export function HubGrid({ kind, items }: { kind: HubKind; items: readonly HubItem[] }) {
  const shown = items.filter((item) => String(item.name || '').trim())

  if (!shown.length) return null

  return (
    <div className="fields">
      {shown.map((item, i) => {
        const jump = hubCardHref(item)
        const className = 'field-card'
        const style = { '--i': i } as CSSProperties
        const key = `${kind}-${item.id || item.name}`
        const inner: ReactNode = <CardBody item={item} />

        if (jump && isOffsiteHref(jump)) {
          return (
            <a
              className={className}
              key={key}
              href={jump}
              target="_blank"
              rel="noreferrer"
              style={style}
            >
              {inner}
            </a>
          )
        }

        return (
          <Link className={className} key={key} to={jump || hubPath(kind, item)} style={style}>
            {inner}
          </Link>
        )
      })}
    </div>
  )
}
