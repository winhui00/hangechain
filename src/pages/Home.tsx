import { Link } from 'react-router-dom'
import { BrandGrid } from '../components/BrandGrid'
import { ContactFacts } from '../components/ContactFacts'
import { InquiryForm } from '../components/InquiryForm'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

export function Home() {
  const { t } = useLocale()
  usePageTitle(t.siteTitle)

  return (
    <>
      <section className="intro">
        <div className="banner">
          <img src="/hangechain-hero.png" alt="" />
          <div className="banner-inner wrap">
            <div className="banner-copy">
              <h1>
                <span>Climate Intelligence</span>
                <span>Refined Living</span>
              </h1>
              <p className="intro-cn">{t.sloganZh}</p>
            </div>
            <aside className="intro-aside">
              <ul className="quicklinks">
                <li>
                  <Link to="/business">
                    {t.home.fieldsTitle} {t.arrow}
                  </Link>
                </li>
                <li>
                  <Link to="/brands">
                    {t.home.brandsTitle} {t.arrow}
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    {t.inquire} {t.arrow}
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="brand-strip" aria-label={t.home.brandsTitle}>
        <BrandGrid variant="panels" />
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.home.profileKicker}</p>
          <h2>{t.home.profileTitle}</h2>
          <div className="prose">
            {t.home.profile.slice(0, 3).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="text-cta" to="/about">
              {t.readMore} {t.arrow}
            </Link>
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <p className="kicker">{t.home.fieldsKicker}</p>
          <h2>{t.home.fieldsTitle}</h2>
          <p className="lead">{t.home.fieldsLead}</p>
          <div className="fields">
            {t.home.fields.map((field) => (
              <Link className="field-card" key={field.name} to={field.to}>
                <h3>
                  {field.name} <span className="cta-arrow">{t.arrow}</span>
                </h3>
                <p>{field.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap news">
          <div>
            <p className="kicker">{t.home.updateKicker}</p>
            <h2>{t.home.updateTitle}</h2>
          </div>
          <article className="news-item">
            <p className="news-meta">
              {t.home.updateKind} · {t.home.updateDate}
            </p>
            <p>{t.home.updateItem}</p>
          </article>
        </div>
      </section>

      <section className="section contact-band">
        <div className="wrap">
          <p className="kicker">{t.home.inquiryKicker}</p>
          <h2>{t.home.inquiryTitle}</h2>
          <p className="lead">{t.contactExpect}</p>
          <div className="inquiry">
            <ContactFacts />
            <div>
              <p className="lead" style={{ marginTop: 0 }}>
                {t.home.inquiryLead}
              </p>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
