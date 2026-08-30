import { NavLink } from 'react-router-dom'
import { useCmsContact, useCmsLegal } from '../content/cms'
import { useLocale } from '../context/locale-context'

export function Footer() {
  const { t } = useLocale()
  const contact = useCmsContact()
  const { legalTabs } = useCmsLegal()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer-legal">
          <span>
            © {year} HGC {t.copyright}
          </span>
          <a href={contact.icpHref} target="_blank" rel="noreferrer">
            {contact.icp}
          </a>
          {legalTabs.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/legal'}>
              {item.title}
            </NavLink>
          ))}
        </p>
      </div>
    </footer>
  )
}
