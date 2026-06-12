import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirige vers /why-me avec des paramètres par défaut
    router.push('/why-me?persona=executive&firstname=Visiteur&company=Votre%20Entreprise')
  }, [])
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <p>Redirection vers la landing page...</p>
    </div>
  )
}
