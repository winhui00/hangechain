import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { navGroups } from '../content/site'
import { useLocale } from '../context/locale-context'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { locale, setLocale, t } = useLocale()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <a className="skip" href="#main">
        Skip
      </a>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <div className={`menu-panel${menuOpen ? ' open' : ''}`}>
        {navGroups.map((group) => (
          <div key={group.id} className="menu-group">
            {group.path && group.children.length === 0 ? (
              <NavLink to={group.path}>{locale === 'zh' ? group.zh : group.en}</NavLink>
            ) : (
              <>
                <p className="menu-label">{locale === 'zh' ? group.zh : group.en}</p>
                {group.children.map((child) => (
                  <NavLink key={child.path} to={child.path}>
                    {locale === 'zh' ? child.zh : child.en}
                  </NavLink>
                ))}
              </>
            )}
          </div>
        ))}
        <div className="locale">
          <button type="button" aria-pressed={locale === 'zh'} onClick={() => setLocale('zh')}>
            {t.localeZh}
          </button>
          <span>/</span>
          <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
            {t.localeEn}
          </button>
        </div>
      </div>
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
