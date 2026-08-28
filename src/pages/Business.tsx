import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

export function Business() {
  const { t } = useLocale()
  usePageTitle(t.business.title)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="kicker">{t.business.kicker}</p>
          <h1>{t.business.title}</h1>
          <p className="lead">{t.business.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <div className="scope">
            {t.business.items.map((item) => (
              <div className="scope-row" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <h2 style={{ marginTop: 64, fontSize: 28 }}>{t.business.boundaryTitle}</h2>
          <p className="lead">{t.business.boundary}</p>
        </div>
      </section>
    </>
  )
}
