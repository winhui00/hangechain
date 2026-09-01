import { Link, Navigate, useParams } from 'react-router-dom'
import { BrandMatrixGroup } from '../components/BrandGrid'
import type { BrandKind } from '../content/site'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'
import { findBusinessItem, paras, parseBusinessBody, useBusinessItems } from '../lib/business'

function matrixKind(...keys: (string | undefined)[]): BrandKind | null {
  for (const key of keys) {
    if (key === 'own' || key === 'agency') return key
  }
  return null
}

export function BusinessDetail() {
  const { slug } = useParams()
  const { locale, t } = useLocale()
  const item = findBusinessItem(useBusinessItems(), slug)
  usePageTitle(item?.name || t.business.title)

  if (!item) return <Navigate to="/business" replace />

  const kind = matrixKind(item.id, slug)
  const parts = kind ? [] : parseBusinessBody(item.body, item.text)
  const homeLabel = locale === 'zh' ? '返回首页' : 'Home'
  const brandsLabel = locale === 'zh' ? '品牌矩阵' : 'Brands'

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
          {kind ? (
            <BrandMatrixGroup kind={kind} intro={false} />
          ) : (
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
          )}
          <div className="detail-actions">
            {kind ? (
              <>
                <Link className="detail-back" to="/">
                  {homeLabel} <span className="cta-arrow">{t.arrow}</span>
                </Link>
                <Link className="detail-back" to="/business">
                  {t.business.kicker} <span className="cta-arrow">{t.arrow}</span>
                </Link>
                <Link className="detail-back" to="/brands">
                  {brandsLabel} <span className="cta-arrow">{t.arrow}</span>
                </Link>
              </>
            ) : (
              <>
                {kind || !item.cta || !item.ctaTo ? null : (
                  <Link className="detail-cta" to={item.ctaTo}>
                    {item.cta} <span className="cta-arrow">{t.arrow}</span>
                  </Link>
                )}
                <Link className="detail-back" to="/business">
                  {t.business.back} <span className="cta-arrow">{t.arrow}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
