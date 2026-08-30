import { FormEvent, useRef, useState } from 'react'
import { cmsBase, useCmsJobs, type Job } from '../content/cms'
import { useLocale } from '../context/locale-context'

function jobLabel(job: Job, locale: string) {
  return locale === 'zh' ? job.title || job.titleEn : job.titleEn || job.title
}

export function ApplyForm({ role, onRole }: { role: string; onRole: (value: string) => void }) {
  const { locale, t } = useLocale()
  const jobs = useCmsJobs()
  const fileRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [fileName, setFileName] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setStatus('sending')
    const body = new FormData()
    body.set('name', name)
    body.set('phone', phone)
    body.set('email', email)
    body.set('role', role)
    body.set('note', message)
    body.set('resume', file)
    try {
      const res = await fetch(`${cmsBase()}/api/public/hangechain/apply`, { method: 'POST', body })
      if (!res.ok) throw new Error('apply')
      setStatus('ok')
      setName('')
      setPhone('')
      setEmail('')
      onRole('')
      setMessage('')
      setFileName('')
      if (fileRef.current) fileRef.current.value = ''
    } catch {
      setStatus('err')
    }
  }

  return (
    <form className="form people-form" onSubmit={onSubmit}>
      <label>
        {t.formName}
        <input name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <div className="form-row">
        <label>
          {t.formPhone}
          <input name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
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
      </div>
      <label>
        {t.formRole}
        <select name="role" value={role} onChange={(e) => onRole(e.target.value)}>
          <option value="">{t.formRoleOpen}</option>
          {jobs.map((job, i) => {
            const label = jobLabel(job, locale)
            return (
              <option key={job.id || i} value={label}>
                {label}
              </option>
            )
          })}
        </select>
      </label>
      <label>
        {t.formMessage}
        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <label className="form-file">
        {t.formResume}
        <span className="form-file-pick">
          <input
            ref={fileRef}
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
          />
          <em>{fileName || t.formResumeHint}</em>
        </span>
      </label>
      <p className="form-note">{t.formNote}</p>
      {status === 'ok' ? <p className="form-ok">{t.applyOk}</p> : null}
      {status === 'err' ? <p className="form-err">{t.applyErr}</p> : null}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.applySending : t.send}
      </button>
    </form>
  )
}
