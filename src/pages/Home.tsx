import { Link } from 'react-router-dom'
import geneDigital from '../assets/genes/digital-tools.jpg'
import geneFirst from '../assets/genes/first-principles.jpg'
import geneOriginal from '../assets/genes/original-dev.jpg'
import { BrandGrid } from '../components/BrandGrid'
import { FieldGrid } from '../components/FieldGrid'
import { HeroSchematic } from '../components/HeroSchematic'
import { useCmsImage } from '../content/cms'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

const geneAlts = ['建筑气候分层模型', '建筑气候数字设计工作台', '暖通阀原创样件']

function keepLines(text: string) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/。(?=不)/g, '。\n')
    .replace(/更是磨砺；\n?/g, '更是磨砺；\n')
    .replace(/更扬长项；\n?/g, '更扬长项；\n')
    .replace(/更讲让渡；\n?/g, '更讲让渡；\n')
}

export function Home() {
  const { t } = useLocale()
  const genes = [useCmsImage('gene.0', geneFirst), useCmsImage('gene.1', geneDigital), useCmsImage('gene.2', geneOriginal)]
  usePageTitle(t.siteTitle)

  return (
    <>
      <section className="intro">
        <div className="banner">
          <div className="banner-atmosphere" aria-hidden />
          <div className="banner-schematic" aria-hidden>
            <HeroSchematic />
          </div>
          <div className="banner-inner wrap">
            <div className="banner-copy">
              <h1>
                <span>{t.heroLine1}</span>
                <span>{t.heroLine2}</span>
              </h1>
              <p className="intro-cn">{t.sloganZh}</p>
            </div>
            <aside className="intro-aside">
              <ul className="quicklinks">
                <li>
                  <Link to="/business">
                    {t.home.heroBusiness} {t.arrow}
                  </Link>
                </li>
                <li>
                  <Link to="/brands">
                    {t.home.heroBrands} {t.arrow}
                  </Link>
                </li>
                <li>
                  <Link to="/p/page-mtemc5ka">
                    {t.home.heroContact} {t.arrow}
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="brand-strip" aria-label={t.home.brandsTitle}>
        <div className="wrap">
          <BrandGrid variant="panels" />
        </div>
      </section>

      <section className="section alt genes" aria-labelledby="genes-title">
        <div className="wrap">
          <p className="kicker">{t.home.genesKicker}</p>
          <h2 id="genes-title">{t.home.genesTitle}</h2>
          <p className="lead">{t.home.genesLead}</p>
          <div className="gene-cards">
            {t.home.genes.map((gene, index) => (
              <article className="gene-card" key={gene.name}>
                <div className="gene-visual">
                  <img
                    src={genes[index]}
                    alt={geneAlts[index]}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="gene-body">
                  <h3>{gene.name}</h3>
                  <p className="gene-en">{gene.nameEn}</p>
                  <p>{gene.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">{t.home.fieldsKicker}</p>
          <h2>{t.home.fieldsTitle}</h2>
          <p className="lead">{t.home.fieldsLead}</p>
          <FieldGrid />
        </div>
      </section>

      <section className="home-gates" aria-label={`${t.home.gates[0].title} / ${t.home.gates[1].title}`}>
        <div className="wrap home-gates-row">
          {t.home.gates.map((gate) => (
            <Link className={`home-gate is-${gate.id}`} key={gate.id} to={gate.to}>
              <p className="kicker">{gate.kicker}</p>
              <h2>{gate.title}</h2>
              <p>{keepLines(gate.text)}</p>
              <span className="home-gate-cta">
                {gate.cta} <span className="cta-arrow">{t.arrow}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
