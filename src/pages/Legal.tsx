import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCmsLegal } from '../content/cms'
import { usePageTitle } from '../hooks'
import { readPrivacyPrefs, writePrivacyPrefs } from '../lib/privacy-prefs'

function tabFromPath(pathname: string) {
  if (pathname.endsWith('/privacy')) return '隐私声明'
  if (pathname.endsWith('/settings')) return '隐私设置'
  return '使用条款'
}

function SettingsPanel() {
  const { legalSettings } = useCmsLegal()
  const [analytics, setAnalytics] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setAnalytics(readPrivacyPrefs().analytics)
  }, [])

  const save = () => {
    writePrivacyPrefs({ analytics })
    setSaved(true)
  }

  return (
    <div className="legal-settings">
      {legalSettings.intro.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <p>
        通过此链接了解相关详细信息：
        <Link to="/legal/privacy">{legalSettings.moreInfo}</Link>。
      </p>
      <label className="legal-check">
        <input
          type="checkbox"
          checked={analytics}
          onChange={(e) => {
            setAnalytics(e.target.checked)
            setSaved(false)
          }}
        />
        <span>
          <strong>{legalSettings.analyticsTitle}</strong>
          <p>
            {legalSettings.analyticsText}{' '}
            <Link to="/legal/privacy">{legalSettings.moreInfo}</Link>
          </p>
        </span>
      </label>
      <p>{legalSettings.note}</p>
      <div className="legal-settings-actions">
        <button type="button" className="privacy-primary" onClick={save}>
          {legalSettings.save}
        </button>
        {saved ? <span className="legal-saved">{legalSettings.saved}</span> : null}
      </div>
    </div>
  )
}

export function Legal() {
  const location = useLocation()
  const { legalTabs, legalTerms, legalPrivacy, legalSettings } = useCmsLegal()
  const tab = tabFromPath(location.pathname)
  const doc = tab === '隐私声明' ? legalPrivacy : legalTerms
  usePageTitle(tab === '隐私设置' ? legalSettings.title : doc.title)

  return (
    <section className="legal-page">
      <div className="wrap">
        <nav className="legal-crumb" aria-label="面包屑">
          <NavLink to="/">首页</NavLink>
          <span>/</span>
          <span>{tab}</span>
        </nav>
        <h1>{tab === '隐私设置' ? legalSettings.title : doc.title}</h1>
        <p className="legal-responsible">
          {tab === '隐私设置' ? legalSettings.responsible : doc.responsible}
        </p>
        <div className="legal-tabs" role="tablist">
          {legalTabs.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/legal'} role="tab">
              {item.title}
            </NavLink>
          ))}
        </div>
        {tab === '隐私设置' ? (
          <div className="legal-body">
            <SettingsPanel />
          </div>
        ) : (
          <div className="legal-body">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
