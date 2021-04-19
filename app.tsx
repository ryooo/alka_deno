import { useDeno } from 'framework/react'
import React, { ComponentType, useEffect } from 'react'
import Header from './components/header.tsx'

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.googletagmanager.com/gtag/js?id=GTM-KPXJ2GB"
    script.async = true
    document.body.appendChild(script)
    const setupScript = document.createElement("script")
    setupScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
    `
    document.body.appendChild(setupScript)
  }, [])

  return (
    <main>
      <link rel="stylesheet" href="./style/app.css" />
      <Header />
      <Page {...pageProps} />
    </main>
  )
}

// set scrollFixer with offset to avoid the fixed header override the hash scroll element
(window as any).scrollFixer = { offset: { top: 40 } }
