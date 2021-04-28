import React, { useState, useRef, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizManager from '~/components/quiz-manager.tsx'
import SpeakButton from '~/components/speak-button.tsx'
import { generateNumberQuiz } from '~/questions/number_quiz.tsx'

export default function MultipleBase({
  className,
  baseNum
}: {
  className?: string,
  baseNum: number,
}) {
  const [questions, setQuestions] = useState(null)
  const descriptionRef = useRef()
  useEffect(() => {
    const arr = ld.map([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => {
      return generateNumberQuiz(baseNum + ' × ' + n, baseNum * n)
    })
    setQuestions(arr.concat(ld.shuffle(arr)))
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>{baseNum}のだん</h1>
            <h1>{baseNum}の<ruby data-ruby="だん">段</ruby>のかけ<ruby data-ruby="ざん">算</ruby>に<ruby data-ruby="こた">答</ruby>えよう
              <SpeakButton textRef={descriptionRef} />
            </h1>
          </div>
        )} />
      </div>
    </div>
  )
}
