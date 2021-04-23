import React, { useEffect, useState, useCallback } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/navList.tsx'
import Button from '~/components/button.tsx'
import TestStart from '~/components/test-start.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { ResultCanvas, showConfetti } from '~/components/result_canvas.tsx'

export default function PageMainContents({
  className
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const serveNextQuestion = useCallback(() => {
    setCurrentQuestion(questions.pop())
  })
  useEffect(() => {
    setQuestions(ld.shuffle(ld.times(10, (n) => {
      return { num: n, limitTime: 5, id: n }
    })))
  }, [])

  return (
    <div className={className}>
      {currentQuestion === null && (
        <TestStart
          description={(
            <>
              <h1>「スタート！」っていったら</h1>
              <h1>がめんにすうじがひょうじされます。</h1>
              <h1>ひょうじされたすうじをよみましょう。</h1>
            </>)}
          onStart={serveNextQuestion} />
      )}
      {currentQuestion !== null && (
        <TestQuestion question={currentQuestion} onNext={serveNextQuestion} />
      )}
    </div>
  )
}

function TestQuestion({
  question,
  onNext,
}: {
  question: any,
  onNext: () => void,
}) {
  const [percent, setPercent] = useState(100)
  const [result, setResult] = useState(null)
  useEffect(() => {
    const startAt = Date.now()
    function tick() {
      const rest = question.limitTime - ((Date.now() - startAt) / 1000)
      setPercent(rest * 100 / question.limitTime)
      if (rest <= 0 && typeof showResultAndOnNext === "function") {
        clearInterval(timerId)
        showResultAndOnNext(false)
      }
    }
    const timerId = setInterval(tick, 30)
    return () => clearInterval(timerId)
  }, [question])
  const showResultAndOnNext = useCallback((ret) => {
    setResult(ret)
    showConfetti()
    setTimeout(() => { onNext() }, 500)
  })
  return (
    <>
      <div className="text-center">
        <>
          <BarProgress percent={percent} />
          <ResultCanvas />
          <div className={percent < 20 && result === null ? "animate-pulse" : ""}>
            <span style={{ fontSize: 15 + "rem" }}>
              {question.num + 1}
            </span>
            <ImageContainer imageName="cookies" count={question.num + 1} perRow={5} />
          </div>
        </>
      </div>
    </>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
}
