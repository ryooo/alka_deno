import React, { useEffect, useState, useCallback } from 'react'
import { getTitle } from '~/components/navList.tsx'
import Button from '~/components/button.tsx'
import TestStart from '~/components/test-start.tsx'
import TestQuestion from '~/components/test-question.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'
import BarCountdownTimer from '~/components/bar-countdown-timer.tsx'
import ImageContainer from '~/components/image-container.tsx'

export default function PageMainContents({
  className
}: {
  className?: string,
}) {
  const contents = (
    <>
      <h1>「スタート！」っていったら</h1>
      <h1>がめんにすうじがひょうじされます。</h1>
      <h1>ひょうじされたすうじをよみましょう。</h1>
    </>
  )
  const questions = [
    {
      jsx: (
        <>
          <BarCountdownTimer limitTime={10} />
          <div style={{ fontSize: 15 + "rem" }}>1</div>
          <ImageContainer imageName="cookies" count={1} perRow={5} />
        </>
      )
    },
  ]
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const onStart = useCallback((e) => {
    setCurrentQuestion(questions[0])
  })

  return (
    <div className={className}>
      <div className="cookie-image cookie-image-30"></div>
      {currentQuestion === null && (
        <TestStart
          contents={contents}
          onStart={onStart} />
      )}
      {currentQuestion !== null && (
        <TestQuestion
          question={currentQuestion} />
      )}
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
}
