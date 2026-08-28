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
          <p className="kicker">{t.brandsPage.kicker}</p>
          <h1>{t.brandsPage.title}</h1>
          <p className="lead">{t.brandsPage.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <BrandGrid />
          <h2 style={{ marginTop: 64, fontSize: 28 }}>{t.brandsPage.logicTitle}</h2>
          <p className="lead">{t.brandsPage.logic}</p>
        </div>
      </section>
    </>
  )
}
