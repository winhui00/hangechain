import { Link } from 'react-router-dom'
import { contact, navGroups } from '../content/site'
import { useLocale } from '../context/locale-context'

export function Footer() {
  const { locale, t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="wordmark">{t.wordmark}</div>
          <p style={{ marginTop: 12 }}>{t.copyright}</p>
        </div>
        {navGroups.map((group) => (
          <nav key={group.id} aria-label={locale === 'zh' ? group.zh : group.en}>
            <p className="footer-label">{locale === 'zh' ? group.zh : group.en}</p>
            {group.path && group.children.length === 0 ? (
              <Link to={group.path}>{locale === 'zh' ? group.zh : group.en}</Link>
            ) : (
              group.children.map((child) => (
                <div key={child.path}>
                  <Link to={child.path}>{locale === 'zh' ? child.zh : child.en}</Link>
                </div>
              ))
            )}
          </nav>
        ))}
        <div className="footer-meta">
          <p className="footer-label">{t.footerLegal}</p>
          <span>{t.icp}</span>
          <span>
            {t.emailLabel} {contact.email}
          </span>
          {contact.emailPlaceholder ? <span>{t.emailNote}</span> : null}
        </div>
      </div>
      <div className="wrap footer-copy">© {year} {t.copyright}</div>
    </footer>
  )
}
