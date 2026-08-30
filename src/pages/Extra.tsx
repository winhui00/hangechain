import { ContactBlock, PlaceGroup } from '../components/PlaceSections'
import { useCms, useCmsContact, useCmsExtraPages } from '../content/cms'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'
import { resolvePlaceContent } from '../lib/places'
import { useParams } from 'react-router-dom'

function lines(value: unknown) {
  if (Array.isArray(value)) return value.map((v) => String(v || '')).filter(Boolean)
  return String(value || '')
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean)
}

export function Extra() {
  const { slug } = useParams()
  const { locale } = useLocale()
  const { ready } = useCms()
  const pages = useCmsExtraPages()
  const contact = useCmsContact()
  const page = pages.find((p) => p.id === slug || p.path === `/p/${slug}`)
  usePageTitle(page?.title || page?.zh || '页面')

  if (!page) {
    if (!ready) return <section className="page-head"><div className="wrap" /></section>
    return (
      <section className="page-head">
        <div className="wrap">
          <p className="kicker">页面</p>
          <h1>没有这一页</h1>
        </div>
      </section>
    )
  }

  const body = lines(page.body)
  const lead = lines(page.lead)
  const resolved = resolvePlaceContent(page, contact)
  const heading = locale === 'zh' ? page.title || page.zh : page.en || page.title || page.zh
  const sub = locale === 'zh' ? page.en : page.title || page.zh
  const showSub = sub && sub !== heading

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{heading}</h1>
          {showSub ? <p className="page-head-en">{sub}</p> : null}
          {lead.length ? (
            <div className="page-head-lead">
              {lead.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      {ready && (resolved.places.length || resolved.warehouses.length || resolved.contacts.length) ? (
        <section className="section places-page" style={{ paddingTop: 32 }}>
          <div className="wrap">
            <PlaceGroup
              title={resolved.placesTitle}
              titleEn={resolved.placesTitleEn}
              places={resolved.places}
              zoom={16}
            />
            <PlaceGroup
              title={resolved.warehousesTitle}
              titleEn={resolved.warehousesTitleEn}
              places={resolved.warehouses}
              zoom={15}
            />
            {resolved.contacts.length ? (
              <ContactBlock
                title={resolved.contactTitle}
                titleEn={resolved.contactTitleEn}
                items={resolved.contacts}
                imageKey={resolved.contactImageKey}
              />
            ) : null}
          </div>
        </section>
      ) : null}
      {body.length ? (
        <section className="section" style={{ paddingTop: resolved.places.length || resolved.warehouses.length || resolved.contacts.length ? 8 : 24 }}>
          <div className="wrap">
            <div className="prose">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
