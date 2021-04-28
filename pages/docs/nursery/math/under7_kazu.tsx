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
    setQuestions([
      generateNumberQuiz(1, 1),
      generateNumberQuiz(2, 2),
      generateNumberQuiz(3, 3),
      generateNumberQuiz(4, 4),
      generateNumberQuiz(5, 5),
      generateNumberQuiz(6, 6),
      generateNumberQuiz(7, 7),
    ].concat(
      ld.shuffle([
        generateNumberQuiz(1, 1),
        generateNumberQuiz(2, 2),
        generateNumberQuiz(3, 3),
        generateNumberQuiz(4, 4),
        generateNumberQuiz(5, 5),
        generateNumberQuiz(6, 6),
        generateNumberQuiz(7, 7),
      ])
    ).concat(
      ld.shuffle([
        generateNumberQuiz(4, 4),
        generateNumberQuiz(5, 5),
        generateNumberQuiz(6, 6),
        generateNumberQuiz(7, 7),
      ])
    ))
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>１　２　３　４　５　６　７</h1>
            <h1>
              よめるかな？
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
