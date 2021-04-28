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
        generateNumberQuiz("11 + 1", 12),
        generateNumberQuiz("11 + 2", 13),
        generateNumberQuiz("11 + 3", 14),
        generateNumberQuiz("11 + 4", 15),
        generateNumberQuiz("11 + 5", 16),
        generateNumberQuiz("11 + 6", 17),
        generateNumberQuiz("11 + 7", 18),
        generateNumberQuiz("11 + 8", 19),
        generateNumberQuiz("11 + 9", 20),
        generateNumberQuiz("12 + 2", 14),
        generateNumberQuiz("12 + 3", 15),
        generateNumberQuiz("12 + 4", 16),
        generateNumberQuiz("12 + 5", 17),
        generateNumberQuiz("12 + 6", 18),
        generateNumberQuiz("12 + 7", 19),
        generateNumberQuiz("12 + 8", 20),
        generateNumberQuiz("12 + 9", 21),
        generateNumberQuiz("13 + 3", 16),
        generateNumberQuiz("13 + 4", 17),
        generateNumberQuiz("13 + 5", 18),
        generateNumberQuiz("13 + 6", 19),
        generateNumberQuiz("13 + 7", 20),
        generateNumberQuiz("13 + 8", 21),
        generateNumberQuiz("13 + 9", 22),
        generateNumberQuiz("14 + 4", 18),
        generateNumberQuiz("14 + 5", 19),
        generateNumberQuiz("14 + 6", 20),
        generateNumberQuiz("14 + 7", 21),
        generateNumberQuiz("14 + 8", 22),
        generateNumberQuiz("14 + 9", 23),
        generateNumberQuiz("15 + 5", 20),
        generateNumberQuiz("15 + 6", 21),
        generateNumberQuiz("15 + 7", 22),
        generateNumberQuiz("15 + 8", 23),
        generateNumberQuiz("15 + 9", 24),
        generateNumberQuiz("16 + 6", 22),
        generateNumberQuiz("16 + 7", 23),
        generateNumberQuiz("16 + 8", 24),
        generateNumberQuiz("16 + 9", 25),
        generateNumberQuiz("17 + 7", 24),
        generateNumberQuiz("17 + 8", 25),
        generateNumberQuiz("17 + 9", 26),
        generateNumberQuiz("18 + 8", 26),
        generateNumberQuiz("18 + 9", 27),
        generateNumberQuiz("19 + 9", 28),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>2けたと1けたのたしざん</h1>
            <h1>たしざんに<ruby data-ruby="こた">答</ruby>えよう</h1>
            <h1>1けた目のたしざんをしたあとに</h1>
            <h1>2けた目をたすのがコツだよ
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
