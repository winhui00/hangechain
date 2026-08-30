import { FieldGrid } from '../components/FieldGrid'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

export function Business() {
  const { t } = useLocale()
  usePageTitle(t.business.title)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{t.business.kicker}</h1>
          <p className="page-head-en">{t.business.title}</p>
          <div className="page-head-lead">
            {String(t.business.lead)
              .split(/\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p) => (
                <p key={p}>{p}</p>
              ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <FieldGrid variant="index" />
          <h2 style={{ marginTop: 64, fontSize: 28 }}>{t.business.boundaryTitle}</h2>
          <p className="lead">{t.business.boundary}</p>
        </div>
      </section>
    </>
  )
}
