import Head from 'next/head'
import { useEffect } from 'react'

// Contenu spécifique à chaque persona
const personaContent = {
  business: {
    title: 'Transformer des problèmes en opportunités',
    lead: 'Acquisition, qualification, optimisation, automatisation : les mécanismes qui permettent de développer une activité.',
    whyContact: `${company => `${company} a besoin de quelqu'un qui comprend les mécanismes permettant de développer une activité.`}`,
    whyContactDetail: 'Acquisition, qualification, optimisation, automatisation : c\'est précisément à l\'intersection de ces compétences que se situe mon parcours.',
    cards: [
      {
        problem: 'Structurer et qualifier un volume important de données pour obtenir des contacts exploitables.',
        action: 'Structuration et qualification d\'une base de données.',
        result: '908 contacts qualifiés.',
        why: 'Ce qui m\'intéresse dans ce résultat n\'est pas le volume. C\'est la capacité à transformer une masse de données en opportunités exploitables.'
      },
      {
        problem: 'Une campagne de prospection n\'a aucune valeur si les messages n\'arrivent pas.',
        action: 'Travail sur la délivrabilité des emails.',
        result: 'Score passé de 4,6 à 10/10 en quelques jours.',
        why: 'Parce qu\'avant d\'améliorer une conversion, il faut déjà exister dans la boîte de réception.'
      },
      {
        problem: 'Certaines tâches répétitives consomment une énergie disproportionnée.',
        action: 'Automatisation du processus.',
        result: '≈ 2h gagnées par session.',
        why: 'Le temps gagné peut ensuite être consacré aux échanges commerciaux et aux actions à forte valeur.'
      }
    ]
  },
  growth: {
    title: 'La croissance se situe souvent à l\'intersection',
    lead: 'Des données, des outils, de l\'exécution et du business. Délivrabilité, acquisition, performance, automatisation, amélioration continue.',
    whyContact: `${company => `${company} a besoin de quelqu\'un qui raisonne en système.`}`,
    whyContactDetail: 'Un profil capable de comprendre à la fois les données, les outils, l\'exécution et les objectifs business pour voir des opportunités là où les profils purement marketing ou purement commerciaux ne les voient pas.',
    cards: [
      {
        problem: 'Beaucoup de professionnels découvrent progressivement les sujets liés à la donnée, aux outils ou à l\'automatisation.',
        action: 'Mon parcours a suivi le chemin inverse : j\'ai commencé par les systèmes, puis les applications, puis les processus, puis l\'acquisition.',
        result: 'Compréhension holistique des enjeux business.',
        why: 'Avec le temps, j\'ai compris que la croissance n\'était pas seulement une question de trafic ou de volume. Elle repose surtout sur la capacité à identifier les bons problèmes et à construire des solutions simples.'
      },
      {
        problem: 'La croissance n\'est pas seulement une question de volume.',
        action: 'Identifier les bons problèmes et construire des solutions simples.',
        result: 'Approche systémique validée.',
        why: 'C\'est cette logique qui m\'amène aujourd\'hui vers le développement commercial et le management d\'affaires.'
      }
    ]
  },
  executive: {
    title: 'La cohérence du parcours',
    lead: 'Stabilité, maturité, autonomie, potentiel d\'intégration : ce que recherchent les organisations.',
    whyContact: `${company => `Je comprends pourquoi une organisation comme ${company} recherche stabilité, maturité et autonomie.`}`,
    whyContactDetail: 'Mon parcours, bien que non conventionnel, offre précisément cette cohérence : une expérience terrain de plus de vingt ans, une capacité à créer de la valeur rapidement, et une volonté de construire dans la durée.',
    cards: [
      {
        problem: 'Après plus de vingt ans dans des environnements techniques et opérationnels, trouver un environnement où contribuer rapidement.',
        action: 'Reprendre un parcours de formation tout en appliquant directement sur le terrain.',
        result: 'Capacité à créer de la valeur rapidement.',
        why: 'Parce que les fonctions commerciales et business occupent progressivement une place centrale dans ce qui me motive : comprendre un besoin, créer de la valeur, développer une activité, faire avancer un projet.'
      },
      {
        problem: 'Je ne cherche pas simplement une alternance.',
        action: 'Je cherche un environnement dans lequel je pourrai contribuer rapidement.',
        result: 'Volonté de construire dans la durée.',
        why: 'Un profil qui ne rentre pas dans une case traditionnelle peut parfois apporter exactement cette vision transversale dont une organisation a besoin.'
      }
    ]
  }
}

// FAQ commune
const faqItems = [
  {
    question: 'Pourquoi reprendre des études aujourd\'hui ?',
    answer: 'Pour formaliser mes compétences en développement commercial et acquisition B2B, tout en continuant à appliquer cette formation directement sur le terrain.'
  },
  {
    question: 'Pourquoi choisir l\'alternance ?',
    answer: 'C\'est le meilleur moyen de créer de la valeur rapidement pour une entreprise, tout en bénéficiant d\'un cadre d\'apprentissage structuré.'
  },
  {
    question: 'Souhaitez-vous poursuivre après le diplôme ?',
    answer: 'Absolument. Je cherche un environnement où je pourrai contribuer sur le long terme, pas seulement pour la durée de l\'alternance.'
  },
  {
    question: 'Accepteriez-vous d\'être encadré ?',
    answer: 'Bien sûr. Même avec mon expérience, j\'ai beaucoup à apprendre dans le domaine commercial. Un bon encadrement accélère la montée en compétence.'
  },
  {
    question: 'Cherchez-vous réellement une carrière commerciale ?',
    answer: 'Oui, c\'est une évolution naturelle de mon parcours. Après avoir passé des années à comprendre les systèmes et les processus, je veux maintenant créer de la valeur directement auprès des clients et des partenaires.'
  }
]

// Frise de parcours commune
const timelineItems = [
  'IT', 'Développement', 'Automatisation', 'Acquisition', 'Business Development', 'Manager d\'Affaires'
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

export default function WhyMePage({ persona: personaParam, firstname = 'Test', company = 'TestCorp' }) {
  const personaKey = getPersonaKey(personaParam)
  const content = personaContent[personaKey]
  const isExecutive = personaKey === 'executive'
  const timelineIntro = isExecutive ? 'Plus de vingt ans d\'expérience' : '22 ans d\'expérience'

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

  return (
    <>
      <Head>
        <title>{firstname ? `Bonjour ${firstname}` : 'Lucas Tymen'} | Lucas Tymen</title>
        <meta name="description" content={`Landing page personnalisée pour ${company}`} />
        <link rel="icon" href="/lucas_profile.png" />
      </Head>

      {/* HERO */}
      <div className="lp-hero">
        <img src="/lucas_profile.png" alt="Lucas Tymen" className="lp-hero-profile" />
        <h1>Bonjour {firstname},</h1>
        <p>Cette page existe pour une raison simple : vous expliquer en moins de deux minutes pourquoi j&#x27;ai pensé qu&#x27;il pouvait être pertinent de vous contacter directement.</p>
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

      {/* PROBLÈME CENTRAL */}
      <div className="lp-section">
        <div className="lp-container">
          <h1 className="lp-title">{content.title}</h1>
          <div className="lp-block">
            <p className="lp-lead">{content.lead}</p>
          </div>
        </div>
      </div>

      {/* CARTES PROBLÈME/ACTION/RÉSULTAT */}
      <div className="lp-section">
        <div className="lp-container">
          <div className="lp-cards-grid">
            {content.cards.map((card, index) => (
              <div className="lp-card" key={index}>
                <span className="lp-card-label">PROBLÈME</span>
                <div className="lp-card-header">
                  <p>{card.problem}</p>
                </div>
                <span className="lp-card-label">ACTION</span>
                <div className="lp-card-body">
                  <p>{card.action}</p>
                </div>
                <span className="lp-card-label">RÉSULTAT</span>
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
          <h2 className="lp-subtitle">Ce qui rend mon parcours un peu différent</h2>
          <div className="lp-profile-grid">
            <div className="lp-profile-column">
              <h3 className="lp-profile-title">
                <span className="lp-profile-icon cross">❌</span>
                Profil classique
              </h3>
              <div className="lp-profile-timeline">
                <div className="lp-profile-item">École de commerce</div>
                <div className="lp-profile-item">Commercial junior</div>
                <div className="lp-profile-item">Business Developer</div>
              </div>
            </div>
            <div className="lp-profile-column">
              <h3 className="lp-profile-title">
                <span className="lp-profile-icon check">✅</span>
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
            Visuellement c\'est très fort. Et ça remplace 10 lignes de texte.
          </p>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      {/* POURQUOI J'AI PRIS L'INITIATIVE */}
      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Pourquoi j\'ai pris l\'initiative de vous contacter</h2>
          <div className="lp-block">
            <p>{typeof content.whyContact === 'function' ? content.whyContact(company) : content.whyContact}</p>
            <p>{content.whyContactDetail}</p>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      {/* FAQ ACCORDÉON */}
      <div className="lp-faq-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Questions fréquentes</h2>
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
              Pensez-vous qu&#x27;un échange de 15 minutes puisse avoir du sens ?<br />
              Si la réponse est non, je comprendrai parfaitement.<br />
              Si la réponse est peut-être, je serais ravi d&#x27;en discuter.
            </p>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=lucas.tymen@gmail.com&su=Echange%20avec%20Lucas%20Tymen&body=Bonjour%20Lucas,%0A%0AJe%20souhaite%20echanger%20avec%20vous%20concernant%20votre%20profil.%0A%0ACordialement"
              className="lp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Répondre à Lucas
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { persona = 'executive', firstname = 'Test', company = 'TestCorp' } = query
  
  return {
    props: {
      persona,
      firstname: firstname || 'Test',
      company: company || 'TestCorp'
    }
  }
}
