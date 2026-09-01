import drawing from '../assets/hero-villa-line.jpg'
import { useCmsImage } from '../content/cms'

export function HeroSchematic() {
  const src = useCmsImage('hero', drawing)
  return (
    <div className="banner-schematic-frame">
      <img className="banner-schematic-img" src={src} alt="" />
    </div>
  )
}
