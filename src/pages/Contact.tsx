import { ContactFacts } from '../components/ContactFacts'
import { InquiryForm } from '../components/InquiryForm'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'

export function Contact() {
  const { t } = useLocale()
  usePageTitle(t.contactPage.title)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="kicker">{t.contactPage.kicker}</p>
          <h1>{t.contactPage.title}</h1>
          <p className="lead">{t.contactPage.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <div className="inquiry">
            <ContactFacts />
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}
