import { Link, Navigate, useParams } from 'react-router-dom'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'
import { paras, parseBusinessBody } from '../lib/business'
import { findHubItem, useHub, type HubKind } from '../lib/hubs'

export function HubDetail({ kind }: { kind: HubKind }) {
  const { slug } = useParams()
  const { t } = useLocale()
  const hub = useHub(kind)
  const item = findHubItem(hub.items, slug)
  usePageTitle(item?.name || hub.kicker)

  if (!item) return <Navigate to={`/${kind}`} replace />

  const parts = parseBusinessBody(item.body, item.text)
  const index = `/${kind}`

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="kicker">
            <Link to={index}>{hub.kicker}</Link>
          </p>
          <h1>{item.name}</h1>
          {item.text ? (
            <div className="page-head-lead">
              <p>{item.text}</p>
            </div>
          ) : null}
        </div>
      </section>
      <section className="section business-detail" style={{ paddingTop: 24 }}>
        <div className="wrap">
          {parts.length ? (
            <div className="culture-lines">
              {parts.map((part) => (
                <article key={part.name || part.text.slice(0, 24)}>
                  {part.name ? <h3>{part.name}</h3> : null}
                  {paras(part.text).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </article>
              ))}
            </div>
          ) : null}
          <div className="detail-actions">
            {item.cta && item.ctaTo ? (
              <Link className="detail-cta" to={item.ctaTo}>
                {item.cta} <span className="cta-arrow">{t.arrow}</span>
              </Link>
            ) : null}
            <Link className="detail-back" to={index}>
              {hub.back} <span className="cta-arrow">{t.arrow}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
