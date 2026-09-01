import { useEffect, useRef, useState } from 'react'
import { placeMapSrc } from '../lib/amap'

export { amapEmbedSrc } from '../lib/amap'

type PlaceMapProps = {
  lat?: number | null
  lng?: number | null
  name: string
  address: string
  hint: string
  zoom?: number
  embed?: string
}

function inView(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0)
  return visible > Math.min(r.height, window.innerHeight) * 0.28
}

export function PlaceMap({ lat, lng, name, address, hint, zoom = 16, embed }: PlaceMapProps) {
  const src = placeMapSrc(
    {
      mapEmbed: embed,
      lat: lat != null ? String(lat) : '',
      lng: lng != null ? String(lng) : '',
      mapName: name,
      mapAddress: address,
      title: name,
      address,
    },
    zoom,
  )
  const box = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const update = (ratio?: number, intersecting?: boolean) => {
      if (typeof ratio === 'number' && typeof intersecting === 'boolean') {
        setLive(intersecting && ratio >= 0.28)
        return
      }
      setLive(inView(el))
    }
    update()
    const io = new IntersectionObserver(
      ([entry]) => update(entry.intersectionRatio, entry.isIntersecting),
      { threshold: [0, 0.15, 0.28, 0.5, 0.8], rootMargin: '0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [src])

  if (!src) return null

  return (
    <div className="place-map" ref={box}>
      {live ? (
        <iframe
          title={hint || name}
          src={src}
          width={600}
          height={480}
          allowFullScreen
          allow="fullscreen; geolocation"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
    </div>
  )
}
