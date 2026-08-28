import { contact } from '../content/site'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

export function About() {
  const { locale, t } = useLocale()
  usePageTitle(t.about.title)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="kicker">{t.about.kicker}</p>
          <h1>{t.about.title}</h1>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="prose">
            {t.about.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h2 style={{ marginTop: 64, fontSize: 28 }}>{t.about.ideaTitle}</h2>
          <p className="lead">{t.about.idea}</p>
          <h2 style={{ marginTop: 64, fontSize: 28 }}>{t.about.valuesTitle}</h2>
          <div className="values">
            {t.about.values.map((value) => (
              <article className="value" key={value.name}>
                <h3>{value.name}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
          <h2 style={{ marginTop: 64, fontSize: 28 }}>{t.about.officeTitle}</h2>
          <p className="lead">{t.about.office}</p>
          <p className="lead">
            {t.officeLabel} · {locale === 'zh' ? contact.officeZh : contact.officeEn}
          </p>
          <p className="lead">
            {t.warehouseLabel} · {locale === 'zh' ? contact.warehouseZh : contact.warehouseEn}
          </p>
          <h2 style={{ marginTop: 64, fontSize: 28 }}>{t.about.rulesTitle}</h2>
          <ul className="rules">
            {t.about.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
