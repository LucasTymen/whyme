import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const personaContent = {
  business: {
    title: 'Pourquoi votre entreprise a besoin de moi',
    whyContact: (company) => `${company} semble reposer sur une logique avant tout orientée entreprise.`,
    whyContactDetail: 'C\'est précisément ce qui a retenu mon attention et ce que je peux concrètement apporter.',
    longDetail: 'Après plus de vingt ans passés à comprendre des environnements complexes, des processus et des organisations, je souhaite mettre cette capacité d\'analyse au service du développement commercial et de la création de valeur.',
    whatICanBring: [
      'Compréhension rapide d\'environnements complexes',
      'Capacité à vulgariser des sujets techniques',
      'Approche structurée de la prospection',
      'Autonomie',
      'Culture du résultat'
    ],
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
    title: 'Pourquoi votre entreprise a besoin de moi',
    whyContact: (company) => `${company} semble nécessiter une compréhension fine des données, des outils et de l\'acquisition.`,
    whyContactDetail: 'Mon parcours m\'a conduit à travailler sur l\'automatisation, l\'analyse, l\'amélioration des processus et la génération d\'opportunités commerciales.',
    longDetail: 'Ce qui m\'intéresse n\'est pas uniquement d\'utiliser des outils. C\'est identifier les frictions, comprendre les besoins et construire des solutions qui permettent de gagner du temps, de la visibilité ou des opportunités.',
    whatICanBring: [
      'Automatisation',
      'Structuration de données',
      'Compréhension des outils',
      'Génération de leads',
      'Optimisation des processus'
    ],
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
    title: 'Pourquoi votre entreprise a besoin de moi',
    whyContact: (company) => `Je m\'intéresse particulièrement aux organisations qui recherchent des profils capables de comprendre rapidement un environnement complexe et de devenir opérationnels.`,
    whyContactDetail: 'Mon expérience m\'a appris à naviguer entre les sujets techniques, humains et organisationnels.',
    longDetail: 'Cette transversalité me permet souvent d\'identifier rapidement les besoins, les risques et les opportunités.',
    whatICanBring: [
      'Vision transverse',
      'Autonomie',
      'Capacité d\'analyse',
      'Compréhension des enjeux business',
      'Capacité d\'exécution'
    ],
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
  },
  'business-development': {
    title: 'Pourquoi votre croissance mérite plus qu’un commercial classique',
    whyContact: (company) => `${company} cherche à développer son activité avec une approche structurée et innovante.`,
    whyContactDetail: 'C’est précisément là que mon parcours hybride entre acquisition, automatisation et growth prend tout son sens.',
    longDetail: 'Après plus de vingt ans à construire des pipelines, automatiser des processus et générer des opportunités, je mets aujourd’hui cette expertise au service du développement commercial B2B. Mon approche combine data, outils et stratégie pour créer de la valeur rapidement.',
    whatICanBring: [
      'Acquisition B2B ciblée',
      'Prospection multicanale (email, LinkedIn, partenariats)',
      'Automatisation des processus commerciaux',
      'Enrichissement et qualification de données',
      'Génération d’opportunités qualifiées',
      'Construction de partenariats stratégiques',
      'Optimisation des pipelines de vente',
      'Business Intelligence appliquée au commercial'
    ],
    cards: [
      {
        problem: 'Structurer et qualifier un volume important de données pour obtenir des contacts exploitables.',
        action: 'Structuration et qualification d’une base de données.',
        result: '908 contacts qualifiés.',
        why: 'Ce qui m’intéresse n’est pas le volume, mais la capacité à transformer des données en opportunités exploitables.'
      },
      {
        problem: 'Une campagne de prospection n’a aucune valeur si les messages ne sont pas ouverts.',
        action: 'Optimisation des campagnes email et LinkedIn.',
        result: '~50% de taux d’ouverture sur les cibles qualifiées.',
        why: 'Parce qu’une bonne délivrabilité est la base de toute prospection efficace.'
      },
      {
        problem: 'Certaines tâches répétitives consomment une énergie disproportionnée.',
        action: 'Automatisation du processus de prospection.',
        result: '2 à 3h gagnées par session.',
        why: 'Le temps gagné peut être consacré aux échanges commerciaux et aux actions à forte valeur.'
      }
    ]
  },
  manager: {
    title: 'Pourquoi votre équipe a besoin de moi',
    whyContact: (company) => `Je m\'intéresse particulièrement aux organisations qui recherchent des profils capables de comprendre rapidement un environnement complexe et de devenir opérationnels.`,
    whyContactDetail: 'Mon expérience m\'a appris à naviguer entre les sujets techniques, humains et organisationnels.',
    longDetail: 'Cette transversalité me permet souvent d\'identifier rapidement les besoins, les risques et les opportunités.',
    whatICanBring: [
      'Vision transverse',
      'Autonomie',
      'Capacité d\'analyse',
      'Compréhension des enjeux business',
      'Capacité d\'exécution'
    ],
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
  },
  rh: {
    title: 'Pourquoi votre service RH a besoin de moi',
    whyContact: (company) => `Je m\'intéresse particulièrement aux organisations qui recherchent des profils capables de comprendre rapidement un environnement complexe et de devenir opérationnels.`,
    whyContactDetail: 'Mon expérience m\'a appris à naviguer entre les sujets techniques, humains et organisationnels.',
    longDetail: 'Cette transversalité me permet souvent d\'identifier rapidement les besoins, les risques et les opportunités.',
    whatICanBring: [
      'Vision transverse',
      'Autonomie',
      'Capacité d\'analyse',
      'Compréhension des enjeux business',
      'Capacité d\'exécution'
    ],
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
  },
  network: {
    title: 'Pourquoi votre réseau a besoin de moi',
    whyContact: (company) => `Je m\'intéresse particulièrement aux organisations qui recherchent des profils capables de comprendre rapidement un environnement complexe et de devenir opérationnels.`,
    whyContactDetail: 'Mon expérience m\'a appris à naviguer entre les sujets techniques, humains et organisationnels.',
    longDetail: 'Cette transversalité me permet souvent d\'identifier rapidement les besoins, les risques et les opportunités.',
    whatICanBring: [
      'Vision transverse',
      'Autonomie',
      'Capacité d\'analyse',
      'Compréhension des enjeux business',
      'Capacité d\'exécution'
    ],
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
  },
  general: {
    title: 'Pourquoi collaborer avec moi',
    whyContact: (company) => `Je m\'intéresse particulièrement aux organisations qui recherchent des profils capables de comprendre rapidement un environnement complexe et de devenir opérationnels.`,
    whyContactDetail: 'Mon expérience m\'a appris à naviguer entre les sujets techniques, humains et organisationnels.',
    longDetail: 'Cette transversalité me permet souvent d\'identifier rapidement les besoins, les risques et les opportunités.',
    whatICanBring: [
      'Vision transverse',
      'Autonomie',
      'Capacité d\'analyse',
      'Compréhension des enjeux business',
      'Capacité d\'exécution'
    ],
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

const timelineItems = [
  'IT', 'Développement', 'Automatisation', 'Acquisition', 'Business Development', 'Manager d\'Affaires'
]

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

export default function WhyMePage() {
  const router = useRouter()
  const { query } = router
  
  const personaParam = query.persona || 'executive'
  const firstname = query.firstname || 'Test'
  const company = query.company || 'TestCorp'
  
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

  const personaKey = getPersonaKey(personaParam)
  const content = personaContent[personaKey]
  const isExecutive = personaKey === 'executive'
  const timelineIntro = isExecutive ? 'Plus de vingt ans d\'expérience' : '22 ans d\'expérience'

  return (
    <>
      <Head>
        <title>{firstname ? `Bonjour ${firstname}` : 'Lucas Tymen'} | Lucas Tymen</title>
        <meta name="description" content={`Landing page personnalisée pour ${company}`} />
        <link rel="icon" href="/lucas_profile.png" />
      </Head>

      <div className="lp-hero">
        <img src="/lucas_profile.png" alt="Lucas Tymen" className="lp-hero-profile" />
        <h1>Bonjour {firstname},</h1>
        <p>Cette page existe pour une raison simple : vous expliquer en moins de deux minutes pourquoi j\'ai pensé qu\'il pouvait être pertinent de vous contacter directement.</p>
      </div>

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
          <h1 className="lp-title">{content.title}</h1>
          <div className="lp-block">
            <p>{content.whyContact(company)}</p>
            <p>{content.whyContactDetail}</p>
            <p>{content.longDetail}</p>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Ce que je peux apporter</h2>
          <div className="lp-block">
            <ul className="lp-list">
              {content.whatICanBring.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lp-section">
        <div className="lp-container">
          <div className="lp-cards-grid">
            {content.cards.map((card, index) => (
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
          <h2 className="lp-subtitle">Ce qui rend mon parcours un peu différent</h2>
          <div className="lp-profile-grid">
            <div className="lp-profile-column">
              <h3 className="lp-profile-title"><span className="lp-profile-icon cross">❌</span> Profil classique</h3>
              <div className="lp-profile-timeline">
                <div className="lp-profile-item">École de commerce</div>
                <div className="lp-profile-item">Commercial junior</div>
                <div className="lp-profile-item">Business Developer</div>
              </div>
            </div>
            <div className="lp-profile-column">
              <h3 className="lp-profile-title"><span className="lp-profile-icon check">✅</span> Mon parcours</h3>
              <div className="lp-profile-timeline">
                {timelineItems.map((item) => <div className="lp-profile-item" key={item}>{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-section">
        <div className="lp-container">
          <h2 className="lp-title">Pourquoi je propose simplement un échange de 15 minutes</h2>
          <div className="lp-block">
            <p>Je ne sais pas encore si mon profil correspond réellement à vos besoins.</p>
            <p>Je ne sais pas non plus si votre environnement correspond à ce que je recherche.</p>
            <p>C\'est précisément pour cela que je propose simplement un échange de 15 minutes.</p>
            <p>L\'objectif n\'est pas de convaincre à tout prix.</p>
            <p>L\'objectif est de vérifier si une discussion mérite d\'aller plus loin.</p>
          </div>
        </div>
      </div>

      <div className="lp-section-divider"></div>

      <div className="lp-faq-section">
        <div className="lp-container">
          <h2 className="lp-subtitle">Questions fréquentes</h2>
          {faqItems.map((item, index) => (
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
            <h2 className="lp-cta-title">Une question simple</h2>
            <p className="lp-cta-text">
              Pensez-vous qu\'un échange de 15 minutes puisse avoir du sens ?<br />
              Si la réponse est non, je comprendrai parfaitement.<br />
              Si la réponse est peut-être, je serais ravi d\'en discuter.
            </p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lucas.tymen@gmail.com&su=Echange%20avec%20Lucas%20Tymen" className="lp-btn" target="_blank" rel="noopener noreferrer">
              Répondre à Lucas
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { persona: 'business' } },
      { params: { persona: 'growth' } },
      { params: { persona: 'executive' } },
      { params: { persona: 'sales' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps() {
  return { props: {} }
}
