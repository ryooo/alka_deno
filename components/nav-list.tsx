import { useRouter } from 'framework/react'
import React, { Fragment, useState } from 'react'
import util from 'https://deno.land/x/aleph@v0.3.0-alpha.30/shared/util.ts'

const navMenu = [
  {
    name: 'ようじ',
    items: [
      {
        title: 'かず',
        pathname: '/docs/nursery/math',
        submenu: [
          { title: '3までのかず', pathname: '/kazu_under3' },
        ],
      },
    ],
  },
  {
    name: '小学1年生',
    items: [
      { title: 'はじめに', pathname: '/docs/elementary_1' },
      {
        title: 'さんすう',
        pathname: '/docs/elementary_1/math',
        submenu: [
          { title: 'かず', pathname: '/numbers' },
        ],
      },
    ],
  },
]

export default function NavList({
  setMenuOpened
}: {
  setMenuOpened?(val: boolean): void
}) {
  const { routePath } = useRouter()
  const [opened, setOpened] = useState(() => navMenu.map(m => m.items).flat().filter(item => item.submenu).reduce((m, item) => {
    m[item.pathname] = routePath.startsWith(item.pathname)
    return m
  }, {} as Record<string, boolean>))
  return (
    <>
      {navMenu.map(g => (
        <Fragment key={g.name}>
          <h2>{g.name}</h2>
          <ul>
            {g.items.map(item => {
              if (item.submenu) {
                return (
                  <Fragment key={item.title + item.pathname}>
                    <li>
                      <label
                        className={opened[item.pathname] ? 'open' : 'close'}
                        onClick={() => setOpened(opened => {
                          opened[item.pathname] = !opened[item.pathname]
                          return { ...opened }
                        })}
                      >
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7" stroke="#999" strokeLinecap="round"></path>
                        </svg>
                        {item.title}
                      </label>
                    </li>
                    {opened[item.pathname] && item.submenu.map(({ title, pathname }) => (
                      <li className="indent" key={title + pathname}>
                        <a
                          rel="nav"
                          href={item.pathname + pathname}
                          onClick={() => props.setMenuOpened(false)}
                        >{title}</a>
                      </li>
                    ))}
                  </Fragment>
                )
              } else {
                return (
                  <li key={item.title + item.pathname}>
                    <a
                      rel="nav"
                      href={item.pathname}
                      onClick={() => props.setMenuOpened(false)}
                    >{item.title}</a>
                  </li>
                )
              }
            })}
          </ul>
        </Fragment>
      ))}
    </>
  )
}

export const getTitle = (url: string): string => {
  const path = util.trimSuffix(util.trimPrefix(url, "/pages"), ".tsx")
  const searchInItem = (items, basePath = "", breadCrumb = []) => {
    return items.map((item) => {
      const itemFullPath = basePath + item.pathname
      if (path == itemFullPath) {
        return breadCrumb.concat(item.title)
      } else if (path.startsWith(itemFullPath)) {
        if (item.submenu != undefined) {
          return searchInItem(item.submenu, itemFullPath, breadCrumb.concat(item.title))
        }
      }
    }).filter((e) => { return e })
  }
  const breadCrumb = navMenu.map(section => {
    return [section.name].concat(searchInItem(section.items))
  })
  return breadCrumb.flat(10).join(" - ")
}
