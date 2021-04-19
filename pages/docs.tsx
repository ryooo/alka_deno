import { useRouter } from 'framework/react'
import util from 'aleph/shared/util.ts'
import hljs from 'highlight'
import bash from 'highlight-languages/bash'
import xml from 'highlight-languages/xml'
import json from 'highlight-languages/json'
import javascript from 'highlight-languages/javascript'
import typescript from 'highlight-languages/typescript'
import React, { ComponentType, Fragment, useEffect, useMemo, useState } from 'react'
import NavList from '~/components/navList.tsx'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml) // depended by jsx
hljs.registerLanguage('bash', (hljs: any) => {
  const l = bash(hljs)
  l.keywords.built_in = 'cd deno aleph'
  return l
})

const ogImage = 'https://alephjs.org/twitter_card.jpg'
const about = 'The Documentation of Aleph.js.'

interface Metadata {
  title: string
  authors: string[]
  keywords?: string[]
}

export default function Docs({ Page }: { Page?: ComponentType<any> & { meta: Metadata } }) {
  const [menuOpened, setMenuOpened] = useState(false)
  const title = [Page?.meta.title, !Page?.meta.title.endsWith('alka') && 'alka'].filter(Boolean).join(' - ')

  return (
    <div className={['docs', menuOpened && 'scroll-lock'].filter(Boolean).join(' ')}>
      <head>
        <title>{title}</title>
        <meta name="description" content={about} />
        {Page?.meta.keywords && (
          <meta name="keywords" content={Page?.meta.keywords.join(',')} />
        )}
        <meta name="og:title" content={title} />
        <meta name="og:description" content={about} />
        <meta name="og:image" content={ogImage} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={about} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ryooo_321" />
        <link rel="stylesheet" href="~/style/docs.css" />
      </head>
      <aside>
        <div className="search">
          <input
            placeholder="さがす..."
            // todo: implement search function
            onChange={util.debounce(() => { alert('Search function is work in progress!') }, 500)}
          />
        </div>
        <div
          className={['menu-button', menuOpened && 'open'].filter(Boolean).join(' ')}
          onClick={e => setMenuOpened(ok => !ok)}
        >
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7" stroke="#999" strokeLinecap="round"></path>
          </svg>
          Menu
        </div>
        <nav className={menuOpened ? 'open' : undefined}>
          <NavList setMenuOpened={setMenuOpened} />
        </nav>
      </aside>
      <div className="content">
        {Page && <Page className="doc-page" />}
        <div className="bottom-space" />
      </div>
    </div >
  )
}

function bashPromptSpan(prompt: string = '$') {
  const span = document.createElement('span')
  span.className = 'bash_prompt'
  span.innerText = prompt + ' '
  return span
}
