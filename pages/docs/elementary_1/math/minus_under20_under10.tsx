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
        generateNumberQuiz('11 - 1', 10),
        generateNumberQuiz('12 - 1', 11),
        generateNumberQuiz('12 - 2', 10),
        generateNumberQuiz('13 - 1', 12),
        generateNumberQuiz('13 - 2', 11),
        generateNumberQuiz('13 - 3', 10),
        generateNumberQuiz('14 - 1', 13),
        generateNumberQuiz('14 - 2', 12),
        generateNumberQuiz('14 - 3', 11),
        generateNumberQuiz('14 - 4', 10),
        generateNumberQuiz('15 - 1', 14),
        generateNumberQuiz('15 - 2', 13),
        generateNumberQuiz('15 - 3', 12),
        generateNumberQuiz('15 - 4', 11),
        generateNumberQuiz('15 - 5', 10),
        generateNumberQuiz('16 - 1', 15),
        generateNumberQuiz('16 - 2', 14),
        generateNumberQuiz('16 - 3', 13),
        generateNumberQuiz('16 - 4', 12),
        generateNumberQuiz('16 - 5', 11),
        generateNumberQuiz('16 - 6', 10),
        generateNumberQuiz('17 - 1', 16),
        generateNumberQuiz('17 - 2', 15),
        generateNumberQuiz('17 - 3', 14),
        generateNumberQuiz('17 - 4', 13),
        generateNumberQuiz('17 - 5', 12),
        generateNumberQuiz('17 - 6', 11),
        generateNumberQuiz('17 - 7', 10),
        generateNumberQuiz('18 - 1', 17),
        generateNumberQuiz('18 - 2', 16),
        generateNumberQuiz('18 - 3', 15),
        generateNumberQuiz('18 - 4', 14),
        generateNumberQuiz('18 - 5', 13),
        generateNumberQuiz('18 - 6', 12),
        generateNumberQuiz('18 - 7', 11),
        generateNumberQuiz('18 - 8', 10),
        generateNumberQuiz('19 - 1', 18),
        generateNumberQuiz('19 - 2', 17),
        generateNumberQuiz('19 - 3', 16),
        generateNumberQuiz('19 - 4', 15),
        generateNumberQuiz('19 - 5', 14),
        generateNumberQuiz('19 - 6', 13),
        generateNumberQuiz('19 - 7', 12),
        generateNumberQuiz('19 - 8', 11),
        generateNumberQuiz('19 - 9', 10),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>くりさがらないひきざん</h1>
            <h1>
              ひきざんに<ruby data-ruby="こた">答</ruby>えよう
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
