import React, { useEffect } from 'react'
import { getTitle } from '~/components/navList.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'
import Button from '~/components/button.tsx'
import TestStart from '~/components/test-start.tsx'

export default function PageMainContents({
  className
}: {
  className?: string,
}) {
  const lineContents = [
    { innerHtml: (<h1>「スタート！」っていったら</h1>) },
    { innerHtml: (<h1>がめんにすうじがひょうじされます。</h1>) },
    { margin: true },
    { innerHtml: (<h1>ひょうじされたすうじをよみましょう。</h1>) },
  ]
  useEffect(() => {
    useSpeechSynthesisUtterance(lineContents.join(""), () => {
      console.log("END")
    })
  }, [])

  return (
    <div className={className}>
      <TestStart lineContents={lineContents} />
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
}
