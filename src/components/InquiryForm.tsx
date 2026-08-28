import { FormEvent, useState } from 'react'
import { contact } from '../content/site'
import { useLocale } from '../context/locale-context'

export function InquiryForm() {
  const { t } = useLocale()
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const subject = encodeURIComponent(`HANGECHAIN inquiry · ${name || org || 'contact'}`)
    const body = encodeURIComponent(
      [`Name: ${name}`, `Organization: ${org}`, `Email: ${email}`, '', message].join('\n'),
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        {t.formName}
        <input name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        {t.formOrg}
        <input name="organization" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} />
      </label>
      <label>
        {t.formEmail}
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        {t.formMessage}
        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      </label>
      <p className="form-note">{t.formNote}</p>
      <button className="btn" type="submit">
        {t.send}
      </button>
    </form>
  )
}
