import { BrandGrid } from '../components/BrandGrid'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

export function Brands() {
  const { t } = useLocale()
  usePageTitle(t.brandsPage.title)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{t.brandsPage.kicker}</h1>
          <p className="page-head-en">{t.brandsPage.title}</p>
          <div className="page-head-lead">
            <p>{t.brandsPage.lead}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="brand-group">
            <h2>{t.brandsPage.ownTitle}</h2>
            <p className="lead">{t.brandsPage.ownLead}</p>
            <BrandGrid kind="own" />
          </div>
          <div className="brand-group">
            <h2>{t.brandsPage.agencyTitle}</h2>
            <p className="lead">{t.brandsPage.agencyLead}</p>
            <BrandGrid kind="agency" />
          </div>
          <div className="brand-logic">
            <h2>{t.brandsPage.logicTitle}</h2>
            <p className="lead">{t.brandsPage.logic}</p>
          </div>
        </div>
      </section>
    </>
  )
}
