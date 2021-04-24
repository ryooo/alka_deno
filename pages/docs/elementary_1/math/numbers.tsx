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
  const createQuestions = useCallback(async () => {
    await waitForKuromojiWorker()
    setQuestions(ld.shuffle(ld.times(10, (n) => {
      const num = n + 1
      const ansers = number_to_ansers(num)
      return {
        num: num, limitTime: 10, id: num, test: (anser) => {
          for (let i in ansers) {
            if (anser.endsWith(ansers[i])) {
              return true
            }
          }
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
}: {
  questions: any,
}) {
  const [cleared, setCleared] = useState(false)
  const recognition = useSpeechRecognition()
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [percent, setPercent] = useState(100)

  const serveNextQuestion = useCallback(() => {
    const nextQuestion = questions.pop()
    if (nextQuestion === undefined) {
      setCleared(true)
    } else {
      setCurrentQuestion(nextQuestion)
    }
  }, [])

  useEffect(() => {
    serveNextQuestion()
    return () => {
      recognition?.destroy()
    }
  }, [questions, recognition])

  useEffect(() => {
    window.kuromojiWorker.onmessage = (message) => {
      if (currentQuestion.score) return
      if (currentQuestion.test(message.data.anser)) {
        recognition.reset()
        const score = percent
        currentQuestion.score = score
        showResultAndOnNext(score)
      }
    }

    const startAt = Date.now()
    function tick() {
      const rest = currentQuestion.limitTime - ((Date.now() - startAt) / 1000)
      setPercent(rest * 100 / currentQuestion.limitTime)
      if (rest <= 0) {
        clearInterval(timerId)
        showResultAndOnNext(0)
      }
    }
    const timerId = setInterval(tick, 30)
    return () => clearInterval(timerId)
  }, [currentQuestion])

  const showResultAndOnNext = useCallback((score) => {
    if (score >= 80) {
      showConfetti({ withParticle: true })
    } else if (score >= 1) {
      showConfetti()
    } else {
      showFailed()
    }
    setTimeout(() => { serveNextQuestion() }, 500)
  }, [])

  return (
    <div className="text-center">
      {cleared ? (
        <>クリア！</>
      ) : (
        currentQuestion === null ? (<>じゅんびちゅう...</>) :
          (<>
            <BarProgress percent={percent} />
            <ResultCanvas />
            <div className={percent < 20 && currentQuestion.score === undefined ? "animate-pulse" : ""}>
              <span style={{ fontSize: 15 + "rem" }}>
                {currentQuestion.num}
              </span>
              <ImageContainer imageName="cookies" count={currentQuestion.num} perRow={5} />
            </div>
          </>)
      )}
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
}
