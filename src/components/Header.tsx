import { NavLink, useLocation } from 'react-router-dom'
import { navGroups } from '../content/site'
import { useLocale } from '../context/locale-context'

type HeaderProps = {
  menuOpen: boolean
  onToggleMenu: () => void
}

export function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  const { locale, setLocale, t } = useLocale()
  const { pathname } = useLocation()

  return (
    <header className="header">
      <div className="wrap header-inner">
        <NavLink to="/" end className="wordmark">
          {t.wordmark}
        </NavLink>
        <nav className="nav" aria-label={t.navAria}>
          {navGroups.map((group) => {
            const childActive = group.children.some((child) => child.path === pathname)
            const directActive = group.path === pathname
            if (group.path && group.children.length === 0) {
              return (
                <NavLink key={group.id} to={group.path} className={directActive ? 'is-current' : undefined}>
                  {locale === 'zh' ? group.zh : group.en}
                </NavLink>
              )
            }
            return (
              <div key={group.id} className={`nav-group${childActive ? ' is-current' : ''}`}>
                <button type="button" aria-haspopup="true">
                  {locale === 'zh' ? group.zh : group.en}
                </button>
                <div className="dropdown">
                  {group.children.map((child) => (
                    <NavLink key={child.path} to={child.path}>
                      {locale === 'zh' ? child.zh : child.en}
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>
        <div className="header-tools">
          <div className="locale">
            <button type="button" aria-pressed={locale === 'zh'} onClick={() => setLocale('zh')}>
              {t.localeZh}
            </button>
            <span>/</span>
            <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
              {t.localeEn}
            </button>
          </div>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            onClick={onToggleMenu}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
