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
        generateNumberQuiz('11 - 10', 1),
        generateNumberQuiz('12 - 10', 2),
        generateNumberQuiz('13 - 10', 3),
        generateNumberQuiz('14 - 10', 4),
        generateNumberQuiz('15 - 10', 5),
        generateNumberQuiz('16 - 10', 6),
        generateNumberQuiz('17 - 10', 7),
        generateNumberQuiz('18 - 10', 8),
        generateNumberQuiz('19 - 10', 9),
        generateNumberQuiz('20 - 10', 10),
        generateNumberQuiz('21 - 10', 11),
        generateNumberQuiz('22 - 20', 2),
        generateNumberQuiz('23 - 10', 13),
        generateNumberQuiz('24 - 10', 14),
        generateNumberQuiz('25 - 10', 15),
        generateNumberQuiz('26 - 10', 16),
        generateNumberQuiz('27 - 20', 7),
        generateNumberQuiz('28 - 20', 8),
        generateNumberQuiz('29 - 10', 19),
        generateNumberQuiz('30 - 10', 20),
        generateNumberQuiz('31 - 20', 11),
        generateNumberQuiz('32 - 10', 22),
        generateNumberQuiz('33 - 10', 23),
        generateNumberQuiz('34 - 30', 4),
        generateNumberQuiz('35 - 10', 25),
        generateNumberQuiz('36 - 10', 26),
        generateNumberQuiz('37 - 20', 17),
        generateNumberQuiz('38 - 30', 8),
        generateNumberQuiz('39 - 20', 19),
        generateNumberQuiz('40 - 10', 30),
        generateNumberQuiz('41 - 40', 1),
        generateNumberQuiz('42 - 20', 22),
        generateNumberQuiz('43 - 30', 13),
        generateNumberQuiz('44 - 20', 24),
        generateNumberQuiz('45 - 10', 35),
        generateNumberQuiz('46 - 40', 6),
        generateNumberQuiz('47 - 10', 37),
        generateNumberQuiz('48 - 30', 18),
        generateNumberQuiz('49 - 10', 39),
        generateNumberQuiz('50 - 30', 20),
        generateNumberQuiz('51 - 10', 41),
        generateNumberQuiz('52 - 10', 42),
        generateNumberQuiz('53 - 50', 3),
        generateNumberQuiz('54 - 40', 14),
        generateNumberQuiz('55 - 10', 45),
        generateNumberQuiz('56 - 50', 6),
        generateNumberQuiz('57 - 30', 27),
        generateNumberQuiz('58 - 40', 18),
        generateNumberQuiz('59 - 10', 49),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>−１０のひきざん</h1>
            <h1>10や20をひくときは</h1>
            <h1>1けた目はかわらないんだ
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
