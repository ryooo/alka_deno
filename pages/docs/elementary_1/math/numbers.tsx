import React, { useEffect } from 'react'
import { getTitle } from '~/components/navList.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'
import Button from '~/components/button.tsx'

export default function PageMainContents({
  className
}: {
  className?: string,
}) {
  const headers = [
    "「スタート！」っていったら",
    "がめんにすうじがひょうじされます。",
    "--",
    "ひょうじされたすうじをよみましょう。",
  ]
  useEffect(() => {
    useSpeechSynthesisUtterance(headers.join(""), () => {
      console.log("END")
    })
  }, [])

  return (
    <div className={className}>
      {headers.map((h, i) => {
        return (<h1 key={i}>{h}</h1>)
      })}
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
}
