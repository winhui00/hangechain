import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

function paras(text: unknown) {
  const raw = Array.isArray(text) ? text.join('\n') : String(text || '')
  return raw
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

function Paras({ text, className }: { text: unknown; className?: string }) {
  const lines = paras(text)
  if (!lines.length) return null
  return (
    <div className={className}>
      {lines.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  )
}

function GlyphMark({ name }: { name: string }) {
  const chars = [...String(name || '')]
  const stack = chars.length > 1 && chars.every((ch) => /\p{Script=Han}/u.test(ch))
  if (!stack) return <h3 className="glyph-mark">{name}</h3>
  return (
    <h3 className="glyph-mark glyph-mark-stack">
      {chars.map((ch, i) => (
        <span key={`${ch}-${i}`}>{ch}</span>
      ))}
    </h3>
  )
}

export function About() {
  const { t } = useLocale()
  const a = t.about
  usePageTitle(a.kicker)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{a.kicker}</h1>
          <p className="page-head-en">{a.title}</p>
          <Paras className="page-head-lead" text={a.lead} />
        </div>
      </section>

      <section className="section culture" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <p className="kicker">{a.sloganTitle}</p>
          <h2>{a.sloganHeading}</h2>
          <Paras className="lead-block" text={a.sloganLead} />

          <h3 className="culture-sub">{a.abilityTitle}</h3>
          <div className="glyph-list">
            {a.ability?.map((item) => (
              <article className="glyph" key={item.name}>
                <GlyphMark name={item.name} />
                <Paras className="glyph-body" text={item.text} />
              </article>
            ))}
          </div>

          <h3 className="culture-sub">{a.idealTitle}</h3>
          <div className="glyph-list">
            {a.ideal?.map((item) => (
              <article className="glyph" key={item.name}>
                <GlyphMark name={item.name} />
                <Paras className="glyph-body" text={item.text} />
              </article>
            ))}
          </div>

          <h2>{a.valuesTitle}</h2>
          <Paras className="lead-block" text={a.valuesLead} />
          <div className="culture-values">
            {a.values?.map((value) => (
              <article className="culture-value" key={value.name}>
                <h3>{value.name}</h3>
                <Paras text={value.text} />
              </article>
            ))}
          </div>

          <h2>{a.storiesTitle}</h2>
          <Paras className="lead-block" text={a.storiesLead} />
          {a.storiesBody ? <Paras className="prose" text={a.storiesBody} /> : null}

          <div className="culture-close">
            {(a.close || []).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
