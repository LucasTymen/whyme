import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Contenu specifique a chaque persona
const personaContent = {
  business: {
    title: 'Transformer des problemes en opportunites',
    lead: 'Acquisition, qualification, optimisation, automatisation : les mecanismes qui permettent de developper une activite.',
    whyContact: (company) => `${company} a besoin de quelquun qui comprend les mecanismes permettant de developper une activite.`,
    whyContactDetail: 'Acquisition, qualification, optimisation, automatisation : cest precisement a lintersection de ces competences que se situe mon parcours.',
    cards: [
      {
        problem: 'Structurer et qualifier un volume important de donnees pour obtenir des contacts exploitables.',
        action: 'Structuration et qualification dunne base de donnees.',
        result: '908 contacts qualifies.',
        why: 'Ce qui minteresse dans ce resultat nest pas le volume. Cest la capacite a transformer une masse de donnees en opportunites exploitables.'
      },
      {
        problem: 'Une campagne de prospection na aucune valeur si les messages narrivent pas.',
        action: 'Travail sur la deliverabilite des emails.',
        result: 'Score passe de 4,6 a 10/10 en quelques jours.',
        why: 'Parce quavant dameliorer une conversion, il faut deja exister dans la boite de reception.'
      },
      {
        problem: 'Certaines taches repetitives consomment une energie disproportionnee.',
        action: 'Automatisation du processus.',
        result: '~ 2h gagnees par session.',
        why: 'Le temps gagne peut ensuite etre consacre aux echanges commerciaux et aux actions a forte valeur.'
      }
    ]
  },
  growth: {
    title: 'La croissance se situe souvent a lintersection',
    lead: 'Des donnees, des outils, de lexecution et du business. Deliverabilite, acquisition, performance, automatisation, amelioration continue.',
    whyContact: (company) => `${company} a besoin de quelquun qui raisonne en systeme.`,
    whyContactDetail: 'Un profil capable de comprendre a la fois les donnees, les outils, lexecution et les objectifs business pour voir des opportunites la ou les profils purement marketing ou purement commerciaux ne les voient pas.',
    cards: [
      {
        problem: 'Beaucoup de professionnels decouvrent progressivement les sujets lies a la donnee, aux outils ou a lautomatisation.',
        action: 'Mon parcours a suivi le chemin inverse : jai commence par les systemes, puis les applications, puis les processus, puis lacquisition.',
        result: 'Comprehension holistique des enjeux business.',
        why: 'Avec le temps, jai compris que la croissance netait pas seulement une question de trafic ou de volume. Elle repose surtout sur la capacite a identifier les bons problemes et a construire des solutions simples.'
      },
      {
        problem: 'La croissance nest pas seulement une question de volume.',
        action: 'Identifier les bons problemes et construire des solutions simples.',
        result: 'Approche systemique validee.',
        why: 'Cest cette logique qui mamene aujourdhui vers le developpement commercial et le management daffaires.'
      }
    ]
  },
  executive: {
    title: 'La coherence du parcours',
    lead: 'Stabilite, maturite, autonomie, potentiel dintegration : ce que recherchent les organisations.',
    whyContact: (company) => `Je comprends pourquoi une organisation comme ${company} recherche stabilite, maturite et autonomie.`,
    whyContactDetail: 'Mon parcours, bien que non conventionnel, offre precisement cette coherence : une experience terrain de plus de vingt ans, une capacite a creer de la valeur rapidement, et une volonte de construire dans la duree.',
    cards: [
      {
        problem: 'Apres plus de vingt ans dans des environnements techniques et operationnels, trouver un environnement ou contribuer rapidement.',
        action: 'Reprendre un parcours de formation tout en appliquant directement sur le terrain.',
        result: 'Capacite a creer de la valeur rapidement.',
        why: 'Parce que les fonctions commerciales et business occupent progressivement une place centrale dans ce qui me motive : comprendre un besoin, creer de la valeur, developper une activite, faire avancer un projet.'
      },
      {
        problem: 'Je ne cherche pas simplement une alternance.',
        action: 'Je cherche un environnement dans lequel je pourrai contribuer rapidement.',
        result: 'Volonte de construire dans la duree.',
        why: 'Un profil qui ne rentre pas dans une case traditionnelle peut parfois apporter exactement cette vision transversale dont une organisation a besoin.'
      }
    ]
  }
}

// FAQ commune
const faqItems = [
  {
    question: 'Pourquoi reprendre des etudes aujourdhui ?',
    answer: 'Pour formaliser mes competences en developpement commercial et acquisition B2B, tout en continuant a appliquer cette formation directement sur le terrain.'
  },
  {
    question: 'Pourquoi choisir lalternance ?',
    answer: 'Cest le meilleur moyen de creer de la valeur rapidement pour une entreprise, tout en beneficiant dun cadre dapprentissage structure.'
  },
  {
    question: 'Souhaitez-vous poursuivre apres le diplome ?',
    answer: 'Absolument. Je cherche un environnement ou je pourrai contribuer sur le long terme, pas seulement pour la duree de lalternance.'
  },
  {
    question: 'Accepteriez-vous detre encadre ?',
    answer: 'Bien sur. Memes avec mon experience, jai beaucoup a apprendre dans le domaine commercial. Un bon encadrement accelere la monte en competence.'
  },
  {
    question: 'Cherchez-vous reellement une carriere commerciale ?',
    answer: 'Oui, cest une evolution naturelle de mon parcours. Apres avoir passe des annees a comprendre les systemes et les processus, je veux maintenant creers de la valeur directement aupres des clients et des partenaires.'
  }
]

// Frise de parcours commune
const timelineItems = [
  'IT', 'Developpement', 'Automatisation', 'Acquisition', 'Business Development', 'Manager dAffaires'
]

// Map persona param to content
const getPersonaKey = (persona) => {
  const mapping = {
    'sales': 'business',
    'business': 'business',
    'growth': 'growth',
    'executive': 'executive',
    '1': 'executive',
    '2': 'business',
    '3': 'executive',
    '4': 'growth',
    '5': 'executive',
    '6': 'business'
  }
  return mapping[persona] || 'executive'
}

export default function WhyMePage() {
  const router = useRouter()
  const { query } = router
  
  // Recuperer les parametres de lURL cote client
  const personaParam = query.persona as string || 'executive'
  const firstname = query.firstname as string || 'Test'
  const company = query.company as string || 'TestCorp'
  
  // FAQ toggle handler
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
    initFaq()
  }, [])

  const personaKey = getPersonaKey(personaParam)
  const content = personaContent[personaKey]
  const isExecutive = personaKey === 'executive'
  const timelineIntro = isExecutive ? 'Plus de vingt ans dexperience' : '22 ans dexperience'

  return (
    <>
      <Head>
        <title>{firstname ? `Bonjour ${firstname}` : 'Lucas Tymen'} | Lucas Tymen</title>
        <meta name="description" content={`Landing page personnalisee pour ${company}`} />
        <link rel="icon" href="/lucas_profile.png" />
      </Head>

      {/* HERO */}
      <div className="lp-hero">
        <img src="/lucas_profile.png" alt="Lucas Tymen" className="lp-hero-profile" />
        <h1>Bonjour {firstname},</h1>
        <p>Cette page existe pour une raison simple : vous expliquer en moins de deux minutes pourquoi jai pense quil pouvait etre pertinent de vous contacter directement.</p>
      </div>

      {/* POURQUOI CETTE PAGE EXISTE */}
      <div className="lp-why-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Pourquoi cette page existe</h2>
          <div className="lp-why-grid">
            <div className="lp-why-card">
              <span className="lp-why-card-label">Entreprise</span>
              <span className="lp-why-card-value">{company}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">Persona</span>
              <span className="lp-why-card-value">{personaKey.charAt(0).toUpperCase() + personaKey.slice(1)}</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">Objectif</span>
              <span className="lp-why-card-value">Comprendre si une collaboration a du sens</span>
            </div>
            <div className="lp-why-card">
              <span className="lp-why-card-label">Temps de lecture</span>
              <span className="lp-why-card-value">2 minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      {/* FRISE DE PARCOURS */}
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

      {/* TITRE CENTRAL */}
      <div className="lp-section">
        <div className="lp-container">
          <h1 className="lp-title">{content.title}</h1>
          <div className="lp-block">
            <p className="lp-lead">{content.lead}</p>
          </div>
        </div>
      </div>

      {/* CARTES PROBLEME/ACTION/RESULTAT */}
      <div className="lp-section">
        <div className="lp-container">
          <div className="lp-cards-grid">
            {content.cards.map((card, index) => (
              <div className="lp-card" key={index}>
                <span className="lp-card-label">PROBLEME</span>
                <div className="lp-card-header">
                  <p>{card.problem}</p>
                </div>
                <span className="lp-card-label">ACTION</span>
                <div className="lp-card-body">
                  <p>{card.action}</p>
                </div>
                <span className="lp-card-label">RESULTAT</span>
                <div className="lp-card-footer">
                  <p><strong>{card.result}</strong></p>
                </div>
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

      {/* PROFIL ATYPIQUE */}
      <div className="lp-profile-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Ce qui rend mon parcours un peu different</h2>
          <div className="lp-profile-grid">
            <div className="lp-profile-column">
              <h3 className="lp-profile-title">
                <span className="lp-profile-icon cross">X</span>
                Profil classique
              </h3>
              <div className="lp-profile-timeline">
                <div className="lp-profile-item">Ecole de commerce</div>
                <div className="lp-profile-item">Commercial junior</div>
                <div className="lp-profile-item">Business Developer</div>
              </div>
            </div>
            <div className="lp-profile-column">
              <h3 className="lp-profile-title">
                <span className="lp-profile-icon check">✓</span>
                Mon parcours
              </h3>
              <div className="lp-profile-timeline">
                {timelineItems.map((item) => (
                  <div className="lp-profile-item" key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>
          <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--lp-muted)'}}>
            Visuellement cest tres fort. Et ca remplace 10 lignes de texte.
          </p>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      {/* POURQUOI JAI PRIS LINITIATIVE */}
      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Pourquoi jai pris linitiative de vous contacter</h2>
          <div className="lp-block">
            <p>{content.whyContact(company)}</p>
            <p>{content.whyContactDetail}</p>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      {/* FAQ ACCORDEON */}
      <div className="lp-faq-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Questions frequentes</h2>
          {faqItems.map((item, index) => (
            <div className="lp-faq-item" key={index}>
              <div className="lp-faq-question">
                <span>{item.question}</span>
              </div>
              <div className="lp-faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-section-divider"></div>

      {/* CTA */}
      <div className="lp-section lp-cta-section">
        <div className="lp-container">
          <div className="lp-cta">
            <h2 className="lp-cta-title">Une question simple</h2>
            <p className="lp-cta-text">
              Pensez-vous quun echange de 15 minutes puisse avoir du sens ?
              Si la reponse est non, je comprendrai parfaitement.
              Si la reponse est peut-etre, je serais ravi den discuter.
            </p>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=lucas.tymen@gmail.com&su=Echange%20avec%20Lucas%20Tymen&body=Bonjour%20Lucas,%0A%0AJe%20souhaite%20echanger%20avec%20vous%20concernant%20votre%20profil.%0A%0ACordialement"
              className="lp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repondre a Lucas
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// Static generation for known personas
export async function getStaticPaths() {
  return {
    paths: [
      { params: { persona: 'business' } },
      { params: { persona: 'growth' } },
      { params: { persona: 'executive' } },
      { params: { persona: 'sales' } },
      { params: { persona: '1' } },
      { params: { persona: '2' } },
      { params: { persona: '3' } },
      { params: { persona: '4' } },
      { params: { persona: '5' } },
      { params: { persona: '6' } },
    ],
    fallback: 'blocking',
  }
}

// Empty static props - all data is client-side
export async function getStaticProps() {
  return { props: {} }
}
