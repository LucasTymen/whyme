import Head from 'next/head'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import itContent from './content.json'

const segmentKeys = Object.keys(itContent.segments)

// Lecture sécurisée d'un paramètre d'URL.
// Retourne null si absent, vide, ou non string (ex: paramètre répété).
// Aucun fallback factice : la page gère null avec des formulations éditoriales.
function readQueryValue(value) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, 80)
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="lp-faq-item">
      <div
        className={`lp-faq-question${open ? ' active' : ''}`}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setOpen(!open)
        }}
      >
        <span>{item.question}</span>
      </div>
      <div className={`lp-faq-answer${open ? ' active' : ''}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  )
}

function WhyMeItContent() {
  const router = useRouter()
  const { query } = router

  const segmentKey = query.segment || segmentKeys[0]
  const segment = itContent.segments[segmentKey]
  const common = itContent.common

  // Fallbacks éditoriaux : pas de prénom inventé, pas de "TestCorp".
  const firstname = readQueryValue(query.firstname)
  const company = readQueryValue(query.company)
  const companyDisplay = company || common.companyFallback
  const sectionTitle = company
    ? segment.title.replace('{company}', company)
    : segment.titleGeneric

  return (
    <>
      <Head>
        <title>{`${segment.label} | Lucas Tymen`}</title>
        <meta name="description" content={`Profil IT — ${segment.label}`} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/lucas_profile.png" />
      </Head>

      <div className="lp-hero">
        <img src="/lucas_profile.png" alt="Lucas Tymen" className="lp-hero-profile" />
        <h1>
          {common.greeting}
          {firstname ? ` ${firstname}` : ''},
        </h1>
        <p>{common.pagePurpose}</p>
      </div>

      <div className="lp-why-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{common.whySectionTitle}</h2>
          <div className="lp-why-grid">
            <div className="lp-why-card">
              <span className="lp-why-card-label">{common.entreprise}</span>
              <span className="lp-why-card-value">{companyDisplay}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">{common.segment}</span>
              <span className="lp-why-card-value">{segment.label}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">{common.objectif}</span>
              <span className="lp-why-card-value">{common.objectifValue}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">{common.tempsLecture}</span>
              <span className="lp-why-card-value">{common.tempsLectureValue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-timeline-section">
        <p className="lp-timeline-intro">{common.timelineIntro}</p>
        <div className="lp-timeline">
          {common.timeline.map((item, index) => (
            <Fragment key={item}>
              <div className="lp-timeline-item">
                <span className="lp-timeline-text">{item}</span>
                <span className="lp-timeline-dot"></span>
              </div>
              {index < common.timeline.length - 1 && <div className="lp-timeline-connector"></div>}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section">
        <div className="lp-container">
          <h1 className="lp-title">{sectionTitle}</h1>
          <div className="lp-block">
            <p>{segment.whyContact}</p>
            <p>{common.socleParagraph}</p>
            <p>{segment.longDetail}</p>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{common.whatICanBringTitle}</h2>
          <div className="lp-block">
            <p>{segment.angle}</p>
            <ul className="lp-list">
              {segment.whatICanBring.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {segment.pilotage && (
        <>
          <div className="lp-section-divider"></div>
          <div className="lp-section">
            <div className="lp-container">
              <h2 className="lp-subtitle">{segment.pilotage.title}</h2>
              <div className="lp-block">
                {segment.pilotage.texts.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
                <ul className="lp-list">
                  {segment.pilotage.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{common.cardsTitle}</h2>
          <div className="lp-cards-grid">
            {common.cards.map((card, index) => (
              <div className="lp-card" key={index}>
                <span className="lp-card-label">PROBLÈME</span>
                <div className="lp-card-header"><p>{card.problem}</p></div>
                <span className="lp-card-label">ACTION</span>
                <div className="lp-card-body"><p>{card.action}</p></div>
                <span className="lp-card-label">RÉSULTAT</span>
                <div className="lp-card-footer"><p><strong>{card.result}</strong></p></div>
                <div className="lp-card-why">
                  <span className="lp-card-label">POURQUOI CELA COMPTE</span>
                  <p>{card.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-profile-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{common.profileDifferent}</h2>
          <div className="lp-profile-grid">
            <div className="lp-profile-column">
              <h3 className="lp-profile-title"><span className="lp-profile-icon cross">❌</span> {common.classicProfile}</h3>
              <div className="lp-profile-timeline">
                {common.classicTimeline.map((item, idx) => (
                  <div className="lp-profile-item" key={idx}>{item}</div>
                ))}
              </div>
            </div>
            <div className="lp-profile-column">
              <h3 className="lp-profile-title"><span className="lp-profile-icon check">✅</span> {common.myProfile}</h3>
              <div className="lp-profile-timeline">
                {common.myTimeline.map((item, idx) => (
                  <div className="lp-profile-item" key={idx}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-title">{common.why15min}</h2>
          <div className="lp-block">
            {common.why15minTexts.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-faq-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{common.faqTitle}</h2>
          {common.faq.map((item, index) => (
            <FaqItem key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section lp-cta-section">
        <div className="lp-container">
          <div className="lp-cta">
            <h2 className="lp-cta-title">{common.ctaTitle}</h2>
            <p className="lp-cta-text">
              {common.ctaTexts[0]}<br />
              {common.ctaTexts[1]}<br />
              {common.ctaTexts[2]}
            </p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lucas.tymen@gmail.com&su=Echange%20avec%20Lucas%20Tymen" className="lp-btn" target="_blank" rel="noopener noreferrer">
              {common.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default function WhyMeItPage() {
  return <WhyMeItContent />
}

export async function getStaticPaths() {
  return {
    paths: segmentKeys.map((segment) => ({ params: { segment } })),
    fallback: false,
  }
}

export async function getStaticProps() {
  return { props: {} }
}
