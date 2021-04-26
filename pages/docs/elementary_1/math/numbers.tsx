import React, { useEffect, useState, useCallback } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import TestStart from '~/components/test-start.tsx'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import TestResultList from '~/components/test-result-list.tsx'
import { ResultCanvas, showConfetti, showFailed } from '~/components/result-canvas.tsx'
import { useSpeechRecognition, waitForKuromojiWorker } from '~/hooks/use-speech-recognition.ts'
import { numberToAnsers, kanaToHira } from '~/shared/util.ts'

export default function PageMainContents({
  className
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const createQuestions = useCallback(async () => {
    await waitForKuromojiWorker()
    setQuestions(
      ld.shuffle(
        ld.times(2, (n) => {
          const num = n + 1
          const ansers = numberToAnsers(num)
          return {
            id: num,
            quiz: num,
            limitTime: 2,
            typicalAnser: kanaToHira(ansers[0]),
            test: (anser) => {
              for (let i in ansers) {
                if (anser.endsWith(ansers[i])) {
                  return true
                }
              }
              return false
            }
          }
        })
      )
    )
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
  const recognition = useSpeechRecognition()
  useEffect(() => { return () => { recognition?.destroy() } }, [recognition])

  const [questionIndex, setQuestionIndex] = useState()
  const [scores, setScores] = useState({})
  const [allCleared, setAllCleared] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [percent, setPercent] = useState(100)

  useEffect(() => {
    if (!questions) return
    setQuestionIndex(0)
  }, [questions])

  useEffect(() => {
    if (!questions || questionIndex === undefined) return

    const question = questions[questionIndex]
    if (question === undefined) {
      setAllCleared(true)
    } else {
      let percent = 100
      let cleared = false
      const showResultAndOnNext = (score) => {
        if (cleared) return
        cleared = true
        score = Math.floor(score)
        if (score >= 90) {
          showConfetti({ withParticle: true })
        } else if (score >= 1) {
          showConfetti()
        } else {
          showFailed()
        }
        scores[question.id] = score
        setScores(scores)
        setTimeout(() => { setQuestionIndex(questionIndex + 1) }, 500)
      }
      window.kuromojiWorker.onmessage = (message) => {
        if (question.score) return
        if (question.test(message.data.anser)) {
          clearInterval(timerId)
          recognition.reset()
          showResultAndOnNext(Math.min(percent * 1.2, 100))
        }
      }
      setCurrentQuestion(question)

      const startAt = Date.now()
      const tick = () => {
        if (cleared) return
        const rest = question.limitTime - ((Date.now() - startAt) / 1000)
        percent = rest * 100 / question.limitTime
        setPercent(percent)
        if (rest <= 0) {
          clearInterval(timerId)
          showResultAndOnNext(0)
        }
      }
      const timerId = setInterval(tick, 30)
      return () => clearInterval(timerId)
    }
  }, [questionIndex])

  return (
    <div className="text-center">
      {allCleared ? (
        <>
          <TestResultList questions={questions} scores={scores} />
        </>
      ) : (
        currentQuestion === null ? (<>じゅんびちゅう...</>) :
          (<>
            <BarProgress percent={percent} />
            <ResultCanvas />
            <div className={percent < 20 ? "animate-pulse quizFont" : "quizFont"}>
              <span style={{ fontSize: 15 + "rem" }}>
                {currentQuestion.quiz}
              </span>
              <ImageContainer imageName="cookies" count={currentQuestion.quiz} perRow={5} />
            </div>
          </>)
      )}
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
  className: "testPage",
}
