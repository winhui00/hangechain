import { Link, Navigate, useParams } from 'react-router-dom'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'
import { findBusinessItem, paras, parseBusinessBody, useBusinessItems } from '../lib/business'

export function BusinessDetail() {
  const { slug } = useParams()
  const { t } = useLocale()
  const item = findBusinessItem(useBusinessItems(), slug)
  usePageTitle(item?.name || t.business.title)

  if (!item) return <Navigate to="/business" replace />

  const parts = parseBusinessBody(item.body, item.text)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="kicker">
            <Link to="/business">{t.business.kicker}</Link>
          </p>
          <h1>{item.name}</h1>
          <div className="page-head-lead">
            <p>{item.text}</p>
          </div>
        </div>
      </section>
      <section className="section business-detail" style={{ paddingTop: 24 }}>
        <div className="wrap">
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
          <div className="detail-actions">
            {item.cta && item.ctaTo ? (
              <Link className="detail-cta" to={item.ctaTo}>
                {item.cta} <span className="cta-arrow">{t.arrow}</span>
              </Link>
            ) : null}
            <Link className="detail-back" to="/business">
              {t.business.back} <span className="cta-arrow">{t.arrow}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
