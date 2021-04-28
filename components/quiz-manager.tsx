import React, { useEffect, useState, useCallback, createElement } from 'react'
import { useSetRecoilState } from '@recoil'
import QuizResultList from '~/components/quiz-result-list.tsx'
import { ResultCanvas, canvasShow } from '~/components/result-canvas.tsx'
import { useSpeechRecognition } from '~/hooks/use-speech-recognition.ts'
import QuizStart from '~/components/quiz-start.tsx'
import { waitForKuromojiWorker } from '~/hooks/use-speech-recognition.ts'
import { SidebarConditionAtom } from '~/atoms/sidebar-condition-atom.ts'
import { pushQuizHistory } from '~/hooks/use-indexed-db.ts'
import { BgmAtom } from '~/atoms/bgm-atom.ts'

export default function QuizManager({
  description,
  questions,
}: {
  description: any,
  questions: any,
}) {
  const recognition = useSpeechRecognition()
  useEffect(() => { return () => { recognition?.destroy() } }, [recognition])

  const setSidebarCondition = useSetRecoilState(SidebarConditionAtom)
  const [questionIndex, setQuestionIndex] = useState()
  const [scores, setScores] = useState({})
  const [phase, setPhase] = useState("description")
  const [question, setQuestion] = useState(null)
  const [timeLimitPercent, setTimeLimitPercent] = useState(100)
  const [shouldPulse, setShouldPulse] = useState(false)
  const setBgm = useSetRecoilState(BgmAtom)

  const onStart = useCallback(async () => {
    await waitForKuromojiWorker()
    setBgm({ file: "/bgm/11.mp3" })
    setSidebarCondition({ show: false })
    setPhase("quiz")
    setQuestionIndex(0)
  }, [])

  useEffect(() => {
    if (!questions || questionIndex === undefined) return

    const tmpQuestion = questions[questionIndex]
    if (tmpQuestion === undefined) {
      setPhase("result")
      const saveResult = async () => { await pushQuizHistory(location.pathname, scores) }
      saveResult()
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
        if (!scores[tmpQuestion.id]) scores[tmpQuestion.id] = []
        scores[tmpQuestion.id].push(score)
        setScores(scores)
        setTimeout(() => { setQuestionIndex(questionIndex + 1) }, 500)
      }
      window.kuromojiWorker.onmessage = (message) => {
        if (cleared) return
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
        setShouldPulse(percent < 20)
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
      <ResultCanvas />
      {phase == "description" && (<QuizStart description={description} onStart={onStart} />)}
      {phase == "quiz" && (
        question === null ?
          (<><ruby data-ruby="じゅんびちゅう">準備中</ruby>...</>) :
          (question.renderer({ question, timeLimitPercent, shouldPulse }))
      )}
      {phase == "result" && (<QuizResultList questions={questions} scores={scores} />)}
    </div>
  )
}
