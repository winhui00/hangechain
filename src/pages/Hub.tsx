import { Link } from 'react-router-dom'
import { HubGrid } from '../components/HubGrid'
import { nav } from '../content/site'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'
import { useHub, type HubKind } from '../lib/hubs'

export function Hub({ kind }: { kind: HubKind }) {
  const { locale, t } = useLocale()
  const hub = useHub(kind)
  usePageTitle(hub.kicker || hub.title)
  const home = nav.find((item) => item.path === '/')
  const homeLabel = locale === 'zh' ? home?.zh : home?.en

  const lead = String(hub.lead || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          {homeLabel ? (
            <p className="kicker">
              <Link to="/">{homeLabel}</Link>
            </p>
          ) : null}
          <h1>{hub.kicker}</h1>
          <p className="page-head-en">{hub.title}</p>
          {lead.length ? (
            <div className="page-head-lead">
              {lead.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <HubGrid kind={kind} items={hub.items} />
          {homeLabel ? (
            <div className="detail-actions">
              <Link className="detail-back" to="/">
                {homeLabel} <span className="cta-arrow">{t.arrow}</span>
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
