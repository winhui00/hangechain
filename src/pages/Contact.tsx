import { useState } from 'react'
import { ApplyForm } from '../components/InquiryForm'
import { PlaceBlock } from '../components/PlaceSections'
import { useCms, useCmsContact, useCmsExtraPages, useCmsJobs, type ExtraPlace } from '../content/cms'
import { useLocale } from '../context/locale-context'
import { usePageTitle } from '../hooks'
import { isCoopPage, resolvePlaceContent } from '../lib/places'

function jobLines(text: string) {
  return String(text || '')
    .split(/(\*\*[^*]+\*\*)/g)
    .map((bit, i) => {
      const mark = bit.match(/^\*\*(.+)\*\*$/)
      return mark ? <strong key={i}>{mark[1]}</strong> : bit
    })
}

export function Contact() {
  const { locale, t } = useLocale()
  const { ready } = useCms()
  const contact = useCmsContact()
  const jobs = useCmsJobs()
  const pages = useCmsExtraPages()
  const coop = pages.find(isCoopPage)
  const [role, setRole] = useState('')
  usePageTitle(t.contactPage.title)

  const hqSource = coop ? resolvePlaceContent(coop, contact).places[0] : undefined
  const hq: ExtraPlace = {
    ...hqSource,
    id: hqSource?.id || 'office',
    title: t.contactPage.interviewName,
    titleEn: t.contactPage.interviewNameEn,
    address: hqSource?.address || contact.officeZh,
    addressEn: hqSource?.addressEn || contact.officeEn,
    lat: hqSource?.lat || contact.officeLat,
    lng: hqSource?.lng || contact.officeLng,
    mapName: hqSource?.mapName,
    mapAddress: hqSource?.mapAddress,
    mapEmbed: hqSource?.mapEmbed,
    note: hqSource?.note,
    imageKey: '',
  }

  function pickJob(title: string) {
    setRole(title)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{t.contactPage.kicker}</h1>
          <p className="page-head-en">{t.contactPage.title}</p>
          <div className="page-head-lead">
            <p>{t.contactPage.lead}</p>
          </div>
        </div>
      </section>

      <section className="section people-lane">
        <div className="wrap">
          <p className="kicker">{t.contactPage.jobsKicker}</p>
          <h2>{t.contactPage.jobsTitle}</h2>
          {jobs.length ? (
            <div className="job-list">
              {jobs.map((job, i) => {
                const title = locale === 'zh' ? job.title || job.titleEn : job.titleEn || job.title
                const team = locale === 'zh' ? job.team || job.teamEn : job.teamEn || job.team
                const type = locale === 'zh' ? job.type || job.typeEn : job.typeEn || job.type
                const location = locale === 'zh' ? job.location || job.locationEn : job.locationEn || job.location
                const summary = locale === 'zh' ? job.summary || job.summaryEn : job.summaryEn || job.summary
                return (
                  <article className="job-card" key={job.id || i}>
                    <h3>{title}</h3>
                    <p className="job-meta">
                      {[team, type, location].filter(Boolean).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </p>
                    {summary ? <p className="job-summary">{jobLines(summary)}</p> : null}
                    <button className="job-apply" type="button" onClick={() => pickJob(title || '')}>
                      {t.contactPage.jobApply}
                    </button>
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="job-empty">{t.contactPage.jobsEmpty}</p>
          )}
        </div>
      </section>

      <section className="section people-lane" id="apply">
        <div className="wrap">
          <p className="kicker">{t.contactPage.applyKicker}</p>
          <h2>{t.contactPage.applyTitle}</h2>
          <p className="lead">{t.contactPage.applyLead}</p>
          <ApplyForm role={role} onRole={setRole} />
        </div>
      </section>

      <section className="section alt people-lane people-interview">
        <div className="wrap">
          <p className="kicker">{t.contactPage.interviewKicker}</p>
          <h2>{t.contactPage.interviewTitle}</h2>
          <p className="people-facts">
            <a href={`tel:${contact.phone.replaceAll('-', '')}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          {ready ? <PlaceBlock place={hq} /> : <div className="place-map" />}
        </div>
      </section>
    </>
  )
}
