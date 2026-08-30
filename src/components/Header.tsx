import { NavLink, useLocation } from 'react-router-dom'
import { useCmsNav } from '../content/cms'
import { useLocale } from '../context/locale-context'
import { Wordmark } from './Wordmark'

type HeaderProps = {
  menuOpen: boolean
  onToggleMenu: () => void
}

function pathActive(path: string | undefined, pathname: string) {
  if (!path) return false
  if (pathname === path) return true
  return path !== '/' && pathname.startsWith(`${path}/`)
}

export function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  const { locale, t } = useLocale()
  const { pathname } = useLocation()
  const navGroups = useCmsNav()

  return (
    <header className="header">
      <div className="wrap header-inner">
        <Wordmark link />
        <nav className="nav" aria-label={t.navAria}>
          {navGroups
            .filter((group) => (group.path && !(group.children || []).length) || (group.children || []).length)
            .map((group) => {
            const childActive = (group.children || []).some((child) => pathActive(child.path, pathname))
            const directActive = pathActive(group.path, pathname)
            if (group.path && !(group.children || []).length) {
              return (
                <NavLink key={group.id} to={group.path} className={directActive ? 'is-current' : undefined}>
                  {locale === 'zh' ? group.zh : group.en}
                </NavLink>
              )
            }
            return (
              <div
                key={group.id}
                className={`nav-group${childActive ? ' is-current' : ''}`}
                onMouseLeave={(e) => {
                  const active = document.activeElement
                  if (active instanceof HTMLElement && e.currentTarget.contains(active)) active.blur()
                }}
              >
                <button type="button" aria-haspopup="true">
                  {locale === 'zh' ? group.zh : group.en}
                </button>
                <div className="dropdown">
                  {(group.children || []).map((child) => (
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
