import React, { useEffect, useState, useCallback } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/navList.tsx'
import TestStart from '~/components/test-start.tsx'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { ResultCanvas, showConfetti, showFailed } from '~/components/result_canvas.tsx'
import { useSpeechRecognition, waitForKuromojiWorker } from '~/hooks/useSpeechRecognition.ts'
import { number_to_ansers } from '~/shared/util.ts'

export default function PageMainContents({
  className
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const createQuestions = useCallback(() => {
    setQuestions(ld.shuffle(ld.times(10, (n) => {
      num = n + 1
      return {
        num: num, limitTime: 20, id: num, test: (anser) => {
          ld.forEach(number_to_ansers(num), (correctStr) => {
            if (correctStr == anser) return true
          })
          return false
        }
      }
    })))
  }, [])

  return (
    <div className={className}>
      {questions === null ? (
        <TestStart
          description={(
            <>
              <h1>「スタート！」っていったら</h1>
              <h1>がめんにすうじがひょうじされます。</h1>
              <h1>ひょうじされたすうじをよみましょう。</h1>
            </>)}
          onStart={createQuestions} />) : (
        <TestQuestions questions={questions} />
      )}
    </div>
  )
}

function TestQuestions({
  questions,
  onNext,
}: {
  questions: any,
  onNext: () => void,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const serveNextQuestion = useCallback(() => { setCurrentQuestion(questions.pop()) }, [])
  useEffect(() => {
    const startListenSpeaking = async () => {
      await waitForKuromojiWorker()
      useSpeechRecognition()
      serveNextQuestion()
    }
    startListenSpeaking()
  }, [questions])

  const [percent, setPercent] = useState(100)
  const [result, setResult] = useState(false)
  useEffect(() => {
    if (currentQuestion === null) return
    window.kuromojiWorker.onmessage = (message) => {
      console.log(currentQuestion, message.data)
      if (currentQuestion.test(message.data[0].reading)) {
        showResultAndOnNext(100)
      }
    }
    const startAt = Date.now()
    function tick() {
      const rest = currentQuestion.limitTime - ((Date.now() - startAt) / 1000)
      setPercent(rest * 100 / currentQuestion.limitTime)
      if (rest <= 0 && typeof showResultAndOnNext === "function") {
        clearInterval(timerId)
        showResultAndOnNext(0)
      }
    }
    const timerId = setInterval(tick, 30)
    return () => clearInterval(timerId)
  }, [currentQuestion])
  const showResultAndOnNext = useCallback((score) => {
    setResult(score >= 50)
    if (score >= 80) {
      showConfetti({ withParticle: true })
    } else if (score >= 50) {
      showConfetti()
    } else {
      showFailed()
    }
    setTimeout(() => { serveNextQuestion() }, 500)
  }, [])

  return (
    <div className="text-center">
      {currentQuestion === null ? (<>じゅんびちゅう...</>) :
        (<>
          <BarProgress percent={percent} />
          <ResultCanvas />
          <div className={percent < 20 && result === null ? "animate-pulse" : ""}>
            <span style={{ fontSize: 15 + "rem" }}>
              {currentQuestion.num}
            </span>
            <ImageContainer imageName="cookies" count={currentQuestion.num} perRow={5} />
          </div>
        </>)
      }
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
}
