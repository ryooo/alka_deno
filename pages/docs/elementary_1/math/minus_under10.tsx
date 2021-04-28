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
        generateNumberQuiz('1 - 1', 0),
        generateNumberQuiz('2 - 1', 1),
        generateNumberQuiz('3 - 1', 2),
        generateNumberQuiz('4 - 1', 3),
        generateNumberQuiz('5 - 1', 4),
        generateNumberQuiz('6 - 1', 5),
        generateNumberQuiz('7 - 1', 6),
        generateNumberQuiz('8 - 1', 7),
        generateNumberQuiz('9 - 1', 8),
        generateNumberQuiz('2 - 2', 0),
        generateNumberQuiz('3 - 2', 1),
        generateNumberQuiz('4 - 2', 2),
        generateNumberQuiz('5 - 2', 3),
        generateNumberQuiz('6 - 2', 4),
        generateNumberQuiz('7 - 2', 5),
        generateNumberQuiz('8 - 2', 6),
        generateNumberQuiz('9 - 2', 7),
        generateNumberQuiz('3 - 3', 0),
        generateNumberQuiz('4 - 3', 1),
        generateNumberQuiz('5 - 3', 2),
        generateNumberQuiz('6 - 3', 3),
        generateNumberQuiz('7 - 3', 4),
        generateNumberQuiz('8 - 3', 5),
        generateNumberQuiz('9 - 3', 6),
        generateNumberQuiz('4 - 4', 0),
        generateNumberQuiz('5 - 4', 1),
        generateNumberQuiz('6 - 4', 2),
        generateNumberQuiz('7 - 4', 3),
        generateNumberQuiz('8 - 4', 4),
        generateNumberQuiz('9 - 4', 5),
        generateNumberQuiz('5 - 5', 0),
        generateNumberQuiz('6 - 5', 1),
        generateNumberQuiz('7 - 5', 2),
        generateNumberQuiz('8 - 5', 3),
        generateNumberQuiz('9 - 5', 4),
        generateNumberQuiz('6 - 6', 0),
        generateNumberQuiz('7 - 6', 1),
        generateNumberQuiz('8 - 6', 2),
        generateNumberQuiz('9 - 6', 3),
        generateNumberQuiz('7 - 7', 0),
        generateNumberQuiz('8 - 7', 1),
        generateNumberQuiz('9 - 7', 2),
        generateNumberQuiz('8 - 8', 0),
        generateNumberQuiz('9 - 8', 1),
        generateNumberQuiz('9 - 9', 0),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>10までのひきざん</h1>
            <h1>ひきざんに<ruby data-ruby="こた">答</ruby>えよう
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
