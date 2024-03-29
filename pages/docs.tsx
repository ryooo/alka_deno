import { useRouter } from 'framework/react'
import util from 'aleph/shared/util.ts'
import React, { ComponentType, Fragment, useEffect, useMemo, useState, useRef } from 'react'
import NavList from '~/components/nav-list.tsx'
import { useRecoilState } from '@recoil'
import { SidebarConditionAtom } from '~/atoms/sidebar-condition-atom.ts'
import { BgmAtom } from '~/atoms/bgm-atom.ts'

const ogImage = 'https://alephjs.org/twitter_card.jpg'
const about = 'The Documentation of Aleph.js.'

interface Metadata {
  title: string
  authors: string[]
  keywords?: string[]
}

export default function Docs({
  Page
}: {
  Page?: ComponentType<any> & { meta: Metadata }
}) {
  const [title, setTitle] = useState("")
  const [menuOpened, setMenuOpened] = useState(false)
  const [sidebarCondition, setSidebarCondition] = useRecoilState(SidebarConditionAtom)
  const [bgm, setBgm] = useRecoilState(BgmAtom)
  const audioRef = useRef()

  useEffect(() => {
    setSidebarCondition({ show: true })
    setTitle([Page?.meta.title, !Page?.meta.title.endsWith('alka') && 'alka'].filter(Boolean).join(' - '))
    setBgm({ file: "/bgm/1.mp3" })
  }, [Page?.meta.title])

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', sidebarCondition.show ? "270px" : "0px")
  }, [sidebarCondition])

  useEffect(() => {
    if (bgm.file && audioRef.current?.dataset.srcPath != bgm.file) {
      audioRef.current.src = bgm.file
      audioRef.current.dataset.srcPath = bgm.file
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
      audioRef.current.play()
    }
  }, [bgm])

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
      {sidebarCondition.show && (<aside>
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
      </aside>)}
      {Page && <Page className={Page.meta.className} />}
      <audio ref={audioRef} />
      <div className="bottom-space" />
    </div >
  )
}
