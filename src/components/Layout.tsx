import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useCmsNav } from '../content/cms'
import { SeoHead } from '../content/SeoHead'
import { useLocale } from '../context/locale-context'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { locale } = useLocale()
  const navGroups = useCmsNav()

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
      <SeoHead />
      <a className="skip" href="#main">
        跳过
      </a>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <div className={`menu-panel${menuOpen ? ' open' : ''}`}>
        {navGroups
          .filter((group) => group.path || (group.children || []).length)
          .map((group) => (
          <div key={group.id} className="menu-group">
            {group.path && !(group.children || []).length ? (
              <NavLink to={group.path}>{locale === 'zh' ? group.zh : group.en}</NavLink>
            ) : (
              <>
                <p className="menu-label">{locale === 'zh' ? group.zh : group.en}</p>
                {(group.children || []).map((child) => (
                  <NavLink key={child.path} to={child.path}>
                    {locale === 'zh' ? child.zh : child.en}
                  </NavLink>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
