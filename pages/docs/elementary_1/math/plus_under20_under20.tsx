import React, { useState, useRef, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizManager from '~/components/quiz-manager.tsx'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { charToAnsers, kanaToHira } from '~/shared/util.ts'
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
        generateNumberQuiz('11 + 11', 22),
        generateNumberQuiz('11 + 12', 23),
        generateNumberQuiz('11 + 13', 24),
        generateNumberQuiz('11 + 14', 25),
        generateNumberQuiz('11 + 15', 26),
        generateNumberQuiz('11 + 16', 27),
        generateNumberQuiz('11 + 17', 28),
        generateNumberQuiz('11 + 18', 29),
        generateNumberQuiz('11 + 19', 30),
        generateNumberQuiz('12 + 12', 24),
        generateNumberQuiz('12 + 13', 25),
        generateNumberQuiz('12 + 14', 26),
        generateNumberQuiz('12 + 15', 27),
        generateNumberQuiz('12 + 16', 28),
        generateNumberQuiz('12 + 17', 29),
        generateNumberQuiz('12 + 18', 30),
        generateNumberQuiz('12 + 19', 31),
        generateNumberQuiz('13 + 13', 26),
        generateNumberQuiz('13 + 14', 27),
        generateNumberQuiz('13 + 15', 28),
        generateNumberQuiz('13 + 16', 29),
        generateNumberQuiz('13 + 17', 30),
        generateNumberQuiz('13 + 18', 31),
        generateNumberQuiz('13 + 19', 32),
        generateNumberQuiz('14 + 14', 28),
        generateNumberQuiz('14 + 15', 29),
        generateNumberQuiz('14 + 16', 30),
        generateNumberQuiz('14 + 17', 31),
        generateNumberQuiz('14 + 18', 32),
        generateNumberQuiz('14 + 19', 33),
        generateNumberQuiz('15 + 15', 30),
        generateNumberQuiz('15 + 16', 31),
        generateNumberQuiz('15 + 17', 32),
        generateNumberQuiz('15 + 18', 33),
        generateNumberQuiz('15 + 19', 34),
        generateNumberQuiz('16 + 16', 32),
        generateNumberQuiz('16 + 17', 33),
        generateNumberQuiz('16 + 18', 34),
        generateNumberQuiz('16 + 19', 35),
        generateNumberQuiz('17 + 17', 34),
        generateNumberQuiz('17 + 18', 35),
        generateNumberQuiz('17 + 19', 36),
        generateNumberQuiz('18 + 18', 36),
        generateNumberQuiz('18 + 19', 37),
        generateNumberQuiz('19 + 19', 38),
      ])
    )
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>2けたどうしのたしざん</h1>
            <h1>たしざんに<ruby data-ruby="こた">答</ruby>えましょう</h1>
            <h1>1けた目と2けた目をべつべつにけいさんして、</h1>
            <h1><ruby data-ruby="こた">答</ruby>えをたすのがコツだよ
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
