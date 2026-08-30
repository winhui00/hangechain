import { PlaceMap } from './PlaceMap'
import { useCmsImage } from '../content/cms'
import { useLocale } from '../context/locale-context'
import { parseAmapInput } from '../lib/amap'
import { contactHref, mapLinks, parseCoord, type ExtraContactItem, type ExtraPlace } from '../lib/places'

function PlacePhoto({ imageKey }: { imageKey: string }) {
  const src = useCmsImage(imageKey, '')
  if (!src) return null
  return (
    <figure className="place-photo">
      <img src={src} alt="" />
    </figure>
  )
}

export function PlaceBlock({ place, zoom = 16 }: { place: ExtraPlace; zoom?: number }) {
  const { locale, t } = useLocale()
  const imageKey = place.imageKey || ''
  const photo = useCmsImage(imageKey, '')
  const title = locale === 'zh' ? place.title || place.titleEn : place.titleEn || place.title
  const address = locale === 'zh' ? place.address || place.addressEn : place.addressEn || place.address
  const parsed = parseAmapInput(place.mapEmbed || '')
  const embed = parsed?.embed
  const lat = parseCoord(place.lat) ?? parseCoord(parsed?.lat)
  const lng = parseCoord(place.lng) ?? parseCoord(parsed?.lng)
  const mapName = locale === 'zh' ? place.mapName || parsed?.mapName || title : title
  const mapAddress = locale === 'zh' ? place.mapAddress || parsed?.mapAddress || address : address
  const links = mapLinks(lat, lng, title || '', address || '')
  const hasMap = Boolean(embed) || (lat != null && lng != null)

  return (
    <article className={`place-block${photo ? ' has-image' : ''}`}>
      {imageKey ? <PlacePhoto imageKey={imageKey} /> : null}
      <div className="place-main">
        <div className="place-copy">
          {title ? <h3>{title}</h3> : null}
          {address ? <p className="place-address">{address}</p> : null}
          {place.note ? <p className="place-note">{place.note}</p> : null}
        </div>
        {hasMap ? (
          <PlaceMap
            embed={embed}
            lat={lat}
            lng={lng}
            name={mapName || ''}
            address={mapAddress || ''}
            hint={t.mapHint}
            zoom={zoom}
          />
        ) : (
          <a className="place-map-fallback" href={links.open} target="_blank" rel="noreferrer">
            {t.mapHint}
          </a>
        )}
      </div>
    </article>
  )
}

export function PlaceGroup({
  title,
  titleEn,
  places,
  zoom = 16,
}: {
  title: string
  titleEn: string
  places: ExtraPlace[]
  zoom?: number
}) {
  const { locale } = useLocale()
  if (!places.length) return null
  const heading = locale === 'zh' ? title || titleEn : titleEn || title
  return (
    <section className="place-group">
      {heading ? <h2>{heading}</h2> : null}
      {places.map((place, i) => (
        <PlaceBlock key={place.id || i} place={place} zoom={zoom} />
      ))}
    </section>
  )
}

export function ContactBlock({
  title,
  titleEn,
  items,
  imageKey,
}: {
  title: string
  titleEn: string
  items: ExtraContactItem[]
  imageKey: string
}) {
  const { locale, t } = useLocale()
  const photo = useCmsImage(imageKey, '')
  const heading = locale === 'zh' ? title || titleEn : titleEn || title
  if (!items.length) return null

  return (
    <article className={`place-block contact-block${photo ? ' has-image' : ''}`}>
      {imageKey ? <PlacePhoto imageKey={imageKey} /> : null}
      <div className="place-main place-main-contact">
        <div className="place-copy">
          <h2>{heading || t.businessContact}</h2>
        </div>
        <dl className="place-contacts">
          {items.map((item) => {
            const label = locale === 'zh' ? item.label || item.labelEn : item.labelEn || item.label
            const href = contactHref(item)
            return (
              <div key={`${label}-${item.value}`}>
                <dt>{label}</dt>
                <dd>{href ? <a href={href}>{item.value}</a> : item.value}</dd>
              </div>
            )
          })}
        </dl>
      </div>
    </article>
  )
}
