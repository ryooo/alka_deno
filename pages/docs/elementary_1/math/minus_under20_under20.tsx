import React, { useState, useRef, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizManager from '~/components/quiz-manager.tsx'
import SpeakButton from '~/components/speak-button.tsx'
import { generateNumberQuiz } from '~/questions/number_quiz.tsx'

export default function PageMainContents({
  className,
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const descriptionRef = useRef()
  useEffect(() => {
    setQuestions(
      ld.shuffle([
        generateNumberQuiz('11 - 2', 9),
        generateNumberQuiz('11 - 3', 8),
        generateNumberQuiz('11 - 4', 7),
        generateNumberQuiz('11 - 5', 6),
        generateNumberQuiz('11 - 6', 5),
        generateNumberQuiz('11 - 7', 4),
        generateNumberQuiz('11 - 8', 3),
        generateNumberQuiz('11 - 9', 2),
        generateNumberQuiz('12 - 3', 9),
        generateNumberQuiz('12 - 4', 8),
        generateNumberQuiz('12 - 5', 7),
        generateNumberQuiz('12 - 6', 6),
        generateNumberQuiz('12 - 7', 5),
        generateNumberQuiz('12 - 8', 4),
        generateNumberQuiz('12 - 9', 3),
        generateNumberQuiz('13 - 4', 9),
        generateNumberQuiz('13 - 5', 8),
        generateNumberQuiz('13 - 6', 7),
        generateNumberQuiz('13 - 7', 6),
        generateNumberQuiz('13 - 8', 5),
        generateNumberQuiz('13 - 9', 4),
        generateNumberQuiz('14 - 5', 9),
        generateNumberQuiz('14 - 6', 8),
        generateNumberQuiz('14 - 7', 7),
        generateNumberQuiz('14 - 8', 6),
        generateNumberQuiz('14 - 9', 5),
        generateNumberQuiz('15 - 6', 9),
        generateNumberQuiz('15 - 7', 8),
        generateNumberQuiz('15 - 8', 7),
        generateNumberQuiz('15 - 9', 6),
        generateNumberQuiz('16 - 7', 9),
        generateNumberQuiz('16 - 8', 8),
        generateNumberQuiz('16 - 9', 7),
        generateNumberQuiz('17 - 8', 9),
        generateNumberQuiz('17 - 9', 8),
        generateNumberQuiz('18 - 9', 9),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>くりさがりのひきざん</h1>
            <h1>ひきざんに<ruby data-ruby="こた">答</ruby>えよう</h1>
            <h1>10からいくつかりてくるのか、</h1>
            <h1>かんがえるのがコツだよ
            <SpeakButton textRef={descriptionRef} />
            </h1>
          </div>
        )} />
      </div>
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
  className: "testPage",
}
