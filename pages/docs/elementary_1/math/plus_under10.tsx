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
        generateNumberQuiz("1 + 1", 2),
        generateNumberQuiz("1 + 2", 3),
        generateNumberQuiz("1 + 3", 4),
        generateNumberQuiz("1 + 4", 5),
        generateNumberQuiz("1 + 5", 6),
        generateNumberQuiz("1 + 6", 7),
        generateNumberQuiz("1 + 7", 8),
        generateNumberQuiz("1 + 8", 9),
        generateNumberQuiz("1 + 9", 10),
        generateNumberQuiz("2 + 2", 4),
        generateNumberQuiz("2 + 3", 5),
        generateNumberQuiz("2 + 4", 6),
        generateNumberQuiz("2 + 5", 7),
        generateNumberQuiz("2 + 6", 8),
        generateNumberQuiz("2 + 7", 9),
        generateNumberQuiz("2 + 8", 10),
        generateNumberQuiz("2 + 9", 11),
        generateNumberQuiz("3 + 3", 6),
        generateNumberQuiz("3 + 4", 7),
        generateNumberQuiz("3 + 5", 8),
        generateNumberQuiz("3 + 6", 9),
        generateNumberQuiz("3 + 7", 10),
        generateNumberQuiz("3 + 8", 11),
        generateNumberQuiz("3 + 9", 12),
        generateNumberQuiz("4 + 4", 8),
        generateNumberQuiz("4 + 5", 9),
        generateNumberQuiz("4 + 6", 10),
        generateNumberQuiz("4 + 7", 11),
        generateNumberQuiz("4 + 8", 12),
        generateNumberQuiz("4 + 9", 13),
        generateNumberQuiz("5 + 5", 10),
        generateNumberQuiz("5 + 6", 11),
        generateNumberQuiz("5 + 7", 12),
        generateNumberQuiz("5 + 8", 13),
        generateNumberQuiz("5 + 9", 14),
        generateNumberQuiz("6 + 6", 12),
        generateNumberQuiz("6 + 7", 13),
        generateNumberQuiz("6 + 8", 14),
        generateNumberQuiz("6 + 9", 15),
        generateNumberQuiz("7 + 7", 14),
        generateNumberQuiz("7 + 8", 15),
        generateNumberQuiz("7 + 9", 16),
        generateNumberQuiz("8 + 8", 16),
        generateNumberQuiz("8 + 9", 17),
        generateNumberQuiz("9 + 9", 18),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>10までのたしざん</h1>
            <h1>たしざんに<ruby data-ruby="こた">答</ruby>えよう
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
