import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { ColorSchemeProvider } from '../components/ColorSchemeContext'
import '@code-hike/mdx/dist/index.css'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('VQICXDGX', {
      includedDomains: ['www.theatrejs.com'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])
  return (
    <ColorSchemeProvider>
      <Component {...pageProps} />
    </ColorSchemeProvider>
  )
}
export default MyApp
