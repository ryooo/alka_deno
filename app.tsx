import { useDeno } from 'framework/react'
import React, { ComponentType, useEffect } from 'react'
import Header from './components/header.tsx'
import 'https://esm.sh/tailwindcss/dist/tailwind.min.css'
import { RecoilRoot } from 'https://esm.sh/recoil@0.1.2'

window.kuromojiWorker = null
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

  useEffect(() => {
    const worker = new Worker(new URL("./js/worker.js", location.origin), { type: "module" })
    worker.onmessage = (e) => {
      if (e.data === "build:success") {
        window.kuromojiWorker = worker
      }
    }
    worker.postMessage({ method: "build" })
  }, [])

  return (
    <RecoilRoot>
      <main>
        <link rel="stylesheet" href="./style/app.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap" rel="stylesheet" />
        <Header />
        <Page {...pageProps} />
      </main>
    </RecoilRoot>
  )
}

// set scrollFixer with offset to avoid the fixed header override the hash scroll element
(window as any).scrollFixer = { offset: { top: 40 } }
