import { NavLink } from 'react-router-dom'
import { useLocale } from '../context/locale-context'

export function Wordmark({ link = false }: { link?: boolean }) {
  const { t } = useLocale()
  const inner = (
    <>
      <span className="wordmark-en">{t.wordmark}</span>
      <span className="wordmark-zh" aria-label={t.wordmarkSub}>
        {Array.from(t.wordmarkSub).map((ch, i) => (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ))}
      </span>
    </>
  )

  if (link) {
    return (
      <NavLink to="/" end className="wordmark" aria-label={`${t.wordmark} ${t.wordmarkSub}`}>
        {inner}
      </NavLink>
    )
  }

  return <div className="wordmark">{inner}</div>
}
