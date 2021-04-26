import { useRouter } from 'framework/react'
import util from 'aleph/shared/util.ts'
import React, { ComponentType, Fragment, useEffect, useMemo, useState } from 'react'
import NavList from '~/components/nav-list.tsx'

const ogImage = 'https://alephjs.org/twitter_card.jpg'
const about = 'The Documentation of Aleph.js.'

interface Metadata {
  title: string
  authors: string[]
  keywords?: string[]
}

window.setSidebarCondition = (display) => {
  document.documentElement.style.setProperty('--sidebar-width', display ? "270px" : "0px")
}

export default function Docs({
  Page
}: {
  Page?: ComponentType<any> & { meta: Metadata }
}) {
  const [title, setTitle] = useState("")
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    window.setSidebarCondition(true)
    setTitle([Page?.meta.title, !Page?.meta.title.endsWith('alka') && 'alka'].filter(Boolean).join(' - '))
  }, [Page?.meta.title])

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
        <link rel="stylesheet" href="~/style/sidebar.css" />
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
        {Page && <Page className={Page.meta.className} />}
        <div className="bottom-space" />
      </div>
    </div >
  )
}
