import { useCmsNav } from '../content/cms'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'
import { History } from './History'

export function Quality() {
  const { t } = useLocale()
  const nav = useCmsNav()
  const kids = nav.flatMap((g) => g.children || [])
  const qualityChild = kids.find((c) => c.path === '/quality')
  const asHistory =
    (qualityChild && /历史/.test(qualityChild.zh || '')) || /历史/.test(t.quality.kicker || '')
  if (asHistory) return <History kicker={t.quality.kicker} lead={t.quality.lead} />
  return <QualityBody />
}

function QualityBody() {
  const { t } = useLocale()
  usePageTitle(t.quality.title)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{t.quality.kicker}</h1>
          <p className="page-head-en">{t.quality.title}</p>
          <div className="page-head-lead">
            <p>{t.quality.lead}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="scope">
            {t.quality.items.map((item) => (
              <div className="scope-row" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
