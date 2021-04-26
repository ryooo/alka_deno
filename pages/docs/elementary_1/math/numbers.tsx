import React, { useEffect, useState, useCallback, forwardRef } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizStart from '~/components/quiz-start.tsx'
import QuizResultList from '~/components/quiz-result-list.tsx'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { ResultCanvas, canvasShow } from '~/components/result-canvas.tsx'
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
        ld.times(10, (n) => {
          const num = n + 1
          const ansers = numberToAnsers(num)
          return {
            id: num,
            quiz: num,
            limitTime: 20,
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
      <ResultCanvas />
      {questions === null ? (
        <QuizStart
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
  const [question, setQuestion] = useState(null)
  const [timeLimitPercent, setTimeLimitPercent] = useState(100)

  useEffect(() => {
    if (!questions) return
    setQuestionIndex(0)
  }, [questions])

  useEffect(() => {
    if (!questions || questionIndex === undefined) return

    const tmpQuestion = questions[questionIndex]
    if (tmpQuestion === undefined) {
      setAllCleared(true)
    } else {
      let percent = 100
      let cleared = false
      const showResultAndOnNext = (score) => {
        if (cleared) return
        cleared = true
        score = Math.floor(score)
        if (score >= 90) {
          canvasShow(["OkMark", "Particles"])
        } else if (score >= 1) {
          canvasShow("OkMark")
        } else {
          canvasShow("NgMark")
        }
        scores[tmpQuestion.id] = score
        setScores(scores)
        setTimeout(() => { setQuestionIndex(questionIndex + 1) }, 500)
      }
      window.kuromojiWorker.onmessage = (message) => {
        if (tmpQuestion.score) return
        if (tmpQuestion.test(message.data.anser)) {
          clearInterval(timerId)
          recognition.reset()
          showResultAndOnNext(Math.min(percent * 1.2, 100))
        }
      }
      setQuestion(tmpQuestion)

      const startAt = Date.now()
      const tick = () => {
        if (cleared) return
        const rest = tmpQuestion.limitTime - ((Date.now() - startAt) / 1000)
        percent = rest * 100 / tmpQuestion.limitTime
        setTimeLimitPercent(percent)
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
          <QuizResultList questions={questions} scores={scores} />
        </>
      ) : (
        question === null ? (<>じゅんびちゅう...</>) :
          (<>
            <BarProgress percent={timeLimitPercent} />
            <div className={timeLimitPercent < 20 ? "animate-pulse quizFont" : "quizFont"}>
              <span style={{ fontSize: 15 + "rem" }}>
                {question.quiz}
              </span>
              <ImageContainer imageName="cookies" count={question.quiz} perRow={5} />
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
