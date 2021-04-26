import React, { useState, useCallback, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizStart from '~/components/quiz-start.tsx'
import QuizManager from '~/components/quiz-manager.tsx'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { ResultCanvas, canvasShow } from '~/components/result-canvas.tsx'
import { waitForKuromojiWorker } from '~/hooks/use-speech-recognition.ts'
import { numberToAnsers, kanaToHira } from '~/shared/util.ts'
import { useSetRecoilState } from '@recoil'
import { SidebarConditionAtom } from '~/atoms/sidebar-condition-atom.ts'

export default function PageMainContents({
  className,
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const setSidebarCondition = useSetRecoilState(SidebarConditionAtom)
  useEffect(() => {
    canvasShow("OkMark")
  }, [])

  const createQuestions = useCallback(async () => {
    await waitForKuromojiWorker()
    setSidebarCondition({ show: false })
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
            renderer: (props) => {
              return (
                <>
                  <BarProgress percent={props.timeLimitPercent} />
                  <div className={props.shouldPulse ? "animate-pulse quizFont" : "quizFont"}>
                    <span style={{ fontSize: 15 + "rem" }}>
                      {props.question.quiz}
                    </span>
                    <ImageContainer imageName="cookies" count={props.question.quiz} perRow={5} />
                  </div>
                </>
              )
            },
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
      <div className="quizBase">
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
          <QuizManager questions={questions} />
        )}
      </div>
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
  className: "testPage",
}
