import { contact } from '../content/site'
import { useLocale } from '../context/locale-context'

export function ContactFacts() {
  const { locale, t } = useLocale()

  return (
    <dl className="facts">
      <div>
        <dt>{t.officeLabel}</dt>
        <dd>{locale === 'zh' ? contact.officeZh : contact.officeEn}</dd>
      </div>
      <div>
        <dt>{t.warehouseLabel}</dt>
        <dd>{locale === 'zh' ? contact.warehouseZh : contact.warehouseEn}</dd>
      </div>
      <div>
        <dt>{t.phoneLabel}</dt>
        <dd>
          <a href={`tel:${contact.phone.replaceAll('-', '')}`}>{contact.phone}</a>
        </dd>
      </div>
      <div>
        <dt>{t.emailLabel}</dt>
        <dd>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {contact.emailPlaceholder ? <div className="form-note">{t.emailNote}</div> : null}
        </dd>
      </div>
    </dl>
  )
}
