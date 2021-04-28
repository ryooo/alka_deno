import React, { useState, useRef, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizManager from '~/components/quiz-manager.tsx'
import SpeakButton from '~/components/speak-button.tsx'
import { generateCharReading } from '~/questions/char_reading.tsx'

export default function PageMainContents({
  className,
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const descriptionRef = useRef()
  useEffect(() => {
    setQuestions([
      generateCharReading(1, 1),
      generateCharReading(2, 2),
      generateCharReading(3, 3),
      generateCharReading(4, 4),
      generateCharReading(5, 5),
      generateCharReading(6, 6),
      generateCharReading(7, 7),
    ].concat(
      ld.shuffle([
        generateCharReading(1, 1),
        generateCharReading(2, 2),
        generateCharReading(3, 3),
        generateCharReading(4, 4),
        generateCharReading(5, 5),
        generateCharReading(6, 6),
        generateCharReading(7, 7),
      ])
    ).concat(
      ld.shuffle([
        generateCharReading(4, 4),
        generateCharReading(5, 5),
        generateCharReading(6, 6),
        generateCharReading(7, 7),
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
