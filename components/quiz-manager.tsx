import React, { useEffect, useState, useCallback, createElement } from 'react'
import QuizResultList from '~/components/quiz-result-list.tsx'
import { canvasShow } from '~/components/result-canvas.tsx'
import { useSpeechRecognition } from '~/hooks/use-speech-recognition.ts'

export default function QuizManager({
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
        question === null ?
          (<>じゅんびちゅう...</>) :
          (question.renderer({ question, timeLimitPercent }))
      )}
    </div>
  )
}
