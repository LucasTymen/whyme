import Head from 'next/head'
import { useEffect, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import frTranslations from './translations/fr.json'
import enTranslations from './translations/en.json'

// ============================================
// LANGUAGE SYSTEM
// ============================================

const LanguageContext = createContext()

const translationsMap = {
  fr: frTranslations,
  en: enTranslations
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr')
  
  useEffect(() => {
    const langCookie = document.cookie.split('; ').find(row => row.startsWith('lang='))
    if (langCookie) {
      const lang = langCookie.split('=')[1]
      if (['fr', 'en'].includes(lang)) {
        setLanguage(lang)
      }
    }
  }, [])

  const switchLanguage = (lang) => {
    setLanguage(lang)
    const date = new Date()
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000)
    document.cookie = `lang=${lang}; expires=${date.toUTCString()}; path=/; SameSite=Lax`
  }

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

function LanguageSwitch() {
  const { language, switchLanguage } = useContext(LanguageContext)

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '8px',
      background: 'rgba(255,255,255,0.95)',
      padding: '8px 12px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      fontSize: '14px'
    }}>
      <button
        onClick={() => switchLanguage('fr')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          opacity: language === 'fr' ? 1 : 0.6,
          transition: 'opacity 0.2s'
        }}
        title="Français"
        aria-label="Français"
      >
        <img src="/flags/fr.svg" alt="FR" width="24" height="16" />
      </button>
      <button
        onClick={() => switchLanguage('en')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          opacity: language === 'en' ? 1 : 0.6,
          transition: 'opacity 0.2s'
        }}
        title="English"
        aria-label="English"
      >
        <img src="/flags/gb.svg" alt="GB" width="24" height="16" />
      </button>
    </div>
  )
}

// Helper to get nested translation with placeholder replacement
function t(path, params = {}) {
  const { language } = useContext(LanguageContext)
  const translations = translationsMap[language] || frTranslations
  
  const keys = path.split('.')
  let value = translations
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path
    }
  }
  
  if (typeof value === 'string') {
    return value.replace(/\{\w+\}/g, (match) => {
      const key = match.slice(1, -1)
      return params[key] || match
    })
  }
  
  return value
}

// ============================================
// PERSONA MAPPING
// ============================================

const getPersonaKey = (persona) => {
  const mapping = {
    'sales': 'business-development',
    'business': 'business-development',
    'growth': 'growth',
    'executive': 'executive',
    'manager': 'manager',
    'rh': 'rh',
    'network': 'network',
    'general': 'general',
    '1': 'executive',
    '2': 'manager',
    '3': 'rh',
    '4': 'growth',
    '5': 'network',
    '6': 'business-development',
    'persona_1': 'executive',
    'persona_2': 'manager',
    'persona_3': 'rh',
    'persona_4': 'growth',
    'persona_5': 'network',
    'persona_6': 'business-development',
    'fallback': 'general'
  }
  return mapping[persona] || 'general'
}

const timelineItems = [
  'IT', 'Développement', 'Automatisation', 'Acquisition', 'Business Development', 'Manager d\'Affaires'
]

// ============================================
// MAIN PAGE CONTENT
// ============================================

function WhyMePageContent() {
  const router = useRouter()
  const { query } = router
  const { language } = useContext(LanguageContext)
  
  const personaParam = query.persona || 'executive'
  const firstname = query.firstname || 'Test'
  const company = query.company || 'TestCorp'
  
  const personaKey = getPersonaKey(personaParam)
  const translations = translationsMap[language] || frTranslations
  const isExecutive = personaKey === 'executive'
  
  // Get persona translations
  const personaT = translations[personaKey] || translations.executive || translations.general
  const commonT = translations.common

  // Get whatICanBring
  const whatICanBringKey = personaT.whatICanBring || 'executive'
  const whatICanBring = typeof whatICanBringKey === 'string'
    ? translations.whatICanBring?.[whatICanBringKey] || []
    : whatICanBringKey

  // Get cards
  const cardsKey = personaT.cards || 'executive'
  const cards = typeof cardsKey === 'string'
    ? translations.cards?.[cardsKey] || []
    : cardsKey

  // Get FAQ
  const faq = translations.faq || []

  useEffect(() => {
    const initFaq = () => {
      document.querySelectorAll('.lp-faq-question').forEach(question => {
        question.addEventListener('click', () => {
          question.classList.toggle('active')
          const answer = question.nextElementSibling
          answer.classList.toggle('active')
        })
      })
    }
    if (document.readyState === 'complete') {
      initFaq()
    } else {
      window.addEventListener('load', initFaq)
    }
  }, [])

  const timelineIntro = isExecutive 
    ? commonT.timelineIntroExecutive 
    : commonT.timelineIntroOther

  return (
    <>
      <Head>
        <title>{firstname ? `${commonT.greeting} ${firstname}` : 'Lucas Tymen'} | Lucas Tymen</title>
        <meta name="description" content={`Landing page personnalisée pour ${company}`} />
        <link rel="icon" href="/lucas_profile.png" />
      </Head>

      <LanguageSwitch />

      <div className="lp-hero">
        <img src="/lucas_profile.png" alt="Lucas Tymen" className="lp-hero-profile" />
        <h1>{commonT.greeting} {firstname},</h1>
        <p>{commonT.pagePurpose}</p>
      </div>

      <div className="lp-why-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{commonT.whySectionTitle}</h2>
          <div className="lp-why-grid">
            <div className="lp-why-card">
              <span className="lp-why-card-label">{commonT.entreprise}</span>
              <span className="lp-why-card-value">{company}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">{commonT.persona}</span>
              <span className="lp-why-card-value">{personaKey.charAt(0).toUpperCase() + personaKey.slice(1)}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">{commonT.objectif}</span>
              <span className="lp-why-card-value">{commonT.objectifValue}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">{commonT.tempsLecture}</span>
              <span className="lp-why-card-value">{commonT.tempsLectureValue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-timeline-section">
        <p className="lp-timeline-intro">{timelineIntro}</p>
        <div className="lp-timeline">
          {timelineItems.map((item, index) => (
            <>
              <div className="lp-timeline-item" key={item}>
                <span className="lp-timeline-text">{item}</span>
                <span className="lp-timeline-dot"></span>
              </div>
              {index < timelineItems.length - 1 && <div className="lp-timeline-connector"></div>}
            </>
          ))}
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section">
        <div className="lp-container">
          <h1 className="lp-title">{personaT.title ? t(`persona.${personaKey}.title`, { company }) : personaT.title}</h1>
          <div className="lp-block">
            <p>{personaT.whyContact ? t(`persona.${personaKey}.whyContact`, { company }) : typeof personaT.whyContact === 'function' ? personaT.whyContact(company) : personaT.whyContact}</p>
            <p>{personaT.whyContactDetail}</p>
            <p>{personaT.longDetail}</p>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{commonT.whatICanBring}</h2>
          <div className="lp-block">
            <ul className="lp-list">
              {Array.isArray(whatICanBring) && whatICanBring.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lp-section">
        <div className="lp-container">
          <div className="lp-cards-grid">
            {Array.isArray(cards) && cards.map((card, index) => (
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
          <h2 className="lp-subtitle">{commonT.profileDifferent}</h2>
          <div className="lp-profile-grid">
            <div className="lp-profile-column">
              <h3 className="lp-profile-title"><span className="lp-profile-icon cross">❌</span> {commonT.classicProfile}</h3>
              <div className="lp-profile-timeline">
                {commonT.classicTimeline.map((item, idx) => (
                  <div className="lp-profile-item" key={idx}>{item}</div>
                ))}
              </div>
            </div>
            <div className="lp-profile-column">
              <h3 className="lp-profile-title"><span className="lp-profile-icon check">✅</span> {commonT.myProfile}</h3>
              <div className="lp-profile-timeline">
                {commonT.myTimeline.map((item, idx) => (
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
          <h2 className="lp-title">{commonT.why15min}</h2>
          <div className="lp-block">
            <p>{commonT.why15minText1}</p>
            <p>{commonT.why15minText2}</p>
            <p>{commonT.why15minText3}</p>
            <p>{commonT.why15minText4}</p>
            <p>{commonT.why15minText5}</p>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-faq-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">{commonT.faqTitle}</h2>
          {Array.isArray(faq) && faq.map((item, index) => (
            <div className="lp-faq-item" key={index}>
              <div className="lp-faq-question"><span>{item.question}</span></div>
              <div className="lp-faq-answer"><p>{item.answer}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section lp-cta-section">
        <div className="lp-container">
          <div className="lp-cta">
            <h2 className="lp-cta-title">{commonT.ctaTitle}</h2>
            <p className="lp-cta-text">
              {commonT.ctaText1}<br />
              {commonT.ctaText2}<br />
              {commonT.ctaText3}
            </p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lucas.tymen@gmail.com&su=Echange%20avec%20Lucas%20Tymen" className="lp-btn" target="_blank" rel="noopener noreferrer">
              {commonT.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default function WhyMePage() {
  return (
    <LanguageProvider>
      <WhyMePageContent />
    </LanguageProvider>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { persona: 'business' } },
      { params: { persona: 'growth' } },
      { params: { persona: 'executive' } },
      { params: { persona: 'sales' } },
      { params: { persona: 'business-development' } },
      { params: { persona: 'manager' } },
      { params: { persona: 'rh' } },
      { params: { persona: 'network' } },
      { params: { persona: 'general' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps() {
  return { props: {} }
}
