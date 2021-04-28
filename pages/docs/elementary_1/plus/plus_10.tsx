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
        generateNumberQuiz('1 + 10', 11),
        generateNumberQuiz('2 + 10', 12),
        generateNumberQuiz('3 + 10', 13),
        generateNumberQuiz('4 + 10', 14),
        generateNumberQuiz('5 + 10', 15),
        generateNumberQuiz('6 + 10', 16),
        generateNumberQuiz('7 + 10', 17),
        generateNumberQuiz('8 + 10', 18),
        generateNumberQuiz('9 + 10', 19),
        generateNumberQuiz('1 + 20', 21),
        generateNumberQuiz('2 + 20', 22),
        generateNumberQuiz('3 + 20', 23),
        generateNumberQuiz('4 + 20', 24),
        generateNumberQuiz('5 + 20', 25),
        generateNumberQuiz('6 + 20', 26),
        generateNumberQuiz('7 + 20', 27),
        generateNumberQuiz('8 + 20', 28),
        generateNumberQuiz('9 + 20', 29),
        generateNumberQuiz('1 + 30', 31),
        generateNumberQuiz('2 + 30', 32),
        generateNumberQuiz('3 + 30', 33),
        generateNumberQuiz('4 + 30', 34),
        generateNumberQuiz('5 + 30', 35),
        generateNumberQuiz('6 + 30', 36),
        generateNumberQuiz('7 + 30', 37),
        generateNumberQuiz('8 + 30', 38),
        generateNumberQuiz('9 + 30', 39),
        generateNumberQuiz('1 + 40', 41),
        generateNumberQuiz('2 + 40', 42),
        generateNumberQuiz('3 + 40', 43),
        generateNumberQuiz('4 + 40', 44),
        generateNumberQuiz('5 + 40', 45),
        generateNumberQuiz('6 + 40', 46),
        generateNumberQuiz('7 + 40', 47),
        generateNumberQuiz('8 + 40', 48),
        generateNumberQuiz('9 + 40', 49),
        generateNumberQuiz('1 + 50', 51),
        generateNumberQuiz('2 + 50', 52),
        generateNumberQuiz('3 + 50', 53),
        generateNumberQuiz('4 + 50', 54),
        generateNumberQuiz('5 + 50', 55),
        generateNumberQuiz('6 + 50', 56),
        generateNumberQuiz('7 + 50', 57),
        generateNumberQuiz('8 + 50', 58),
        generateNumberQuiz('9 + 50', 59),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>＋１０のたしざん</h1>
            <h1>たしざんのかたほうが10や20だと</h1>
            <h1>かんたんにけいさんできるよ
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
