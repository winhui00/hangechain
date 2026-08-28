import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

export function Quality() {
  const { t } = useLocale()
  usePageTitle(t.quality.title)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="kicker">{t.quality.kicker}</p>
          <h1>{t.quality.title}</h1>
          <p className="lead">{t.quality.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 12 }}>
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
