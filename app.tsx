import { useDeno } from 'framework/react'
import React, { ComponentType } from 'react'
import Header from './components/header.tsx'

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {

  return (
    <main>
      <link rel="stylesheet" href="./style/app.css" />
      <Header />
      <Page {...pageProps} />
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=default`}></script>
        <script>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
          `}</script>
      </>
    </main>
  )
}

// set scrollFixer with offset to avoid the fixed header override the hash scroll element
(window as any).scrollFixer = { offset: { top: 40 } }
