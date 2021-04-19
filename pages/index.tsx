import { useDeno, dynamic } from 'framework/react'
import React from 'react'
import Button from '~/components/button.tsx'
import PlainLogo from '~/components/plain-logo.tsx'

const thisYear = (new Date).getFullYear()
const title = 'alka'
const about = 'こどものためのさいと'
const keywords = [
  '知育',
  '教育',
  '学習',
  '小学生',
  '幼児',
]
const ogImage = 'https://alephjs.org/twitter_card.jpg'
const features = [
  { href: '/docs/elementary_1', title: 'しょうがく1ねんせい' },
]

const Logo = dynamic(() => import('~/components/logo.tsx'))

export default function Home() {
  return (
    <div className="index-page">
      <head>
        <title>{title}</title>
        <meta name="description" content={about} />
        <meta name="keywords" content={keywords.join(',')} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={about} />
        <meta name="og:image" content={ogImage} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={about} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ryooo_321" />
        <link rel="stylesheet" href="~/style/index.css" />
      </head>
      <div className="fullscreen-page">
        <Logo fallback={<PlainLogo />} />
        <h1>勉強ゲーム alka</h1>
        <p className="intro"><strong>alka</strong>は楽しくわかりやすく勉強をするためのゲームです。</p>
        <p className="intro short">ゲーム感覚で勉強をすすめることで、どんどん身につけましょう</p>
        <div className="buttons">
          <a href="/docs/parents">
            <Button strong>おとうさん・おかあさんへ</Button>
          </a>
          <a href="/docs/elementary_1">
            <Button strong>べんきょうする</Button>
          </a>
        </div>
      </div>
      <section>
        <h2>Features</h2>
        <ul>
          {features.map(({ href, title }) => (
            <li key={href + title}><a href={href}>{title}</a></li>
          ))}
        </ul>
      </section>
      <footer>
        <p>Copyright © {thisYear} alka.inc. All rights reserved.</p>
      </footer>
    </div>
  )
}
