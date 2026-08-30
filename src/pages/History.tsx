import { HistoryRail } from '../components/HistoryRail'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

function paras(text: unknown) {
  const raw = Array.isArray(text) ? text.join('\n') : String(text || '')
  return raw
    .replace(/\*\*/g, '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function History({ kicker, lead }: { kicker?: string; lead?: string } = {}) {
  const { t } = useLocale()
  const h = t.history
  const headKicker = kicker || h.kicker
  const headLead = lead || h.lead
  usePageTitle(headKicker)

  const eras = h.eras || []
  const events = h.events || []

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{headKicker}</h1>
          <p className="page-head-en">{h.title}</p>
          <div className="page-head-lead">
            {paras(headLead).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="section culture" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="history-board">
            <div className="history-eras culture-values">
              {eras.map((era, i) => (
                <article className="culture-value" key={`${era.name}-${i}`}>
                  <h3>{era.name}</h3>
                  {paras(era.text).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </article>
              ))}
            </div>
            <HistoryRail events={events} />
          </div>
        </div>
      </section>
    </>
  )
}
