import React, { useState, useRef, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizManager from '~/components/quiz-manager.tsx'
import SpeakButton from '~/components/speak-button.tsx'
import { generateImageCountReading } from '~/questions/image_count_reading.tsx'

export default function PageMainContents({
  className,
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const descriptionRef = useRef()
  useEffect(() => {
    setQuestions([
      generateImageCountReading(1, 1),
      generateImageCountReading(2, 2),
      generateImageCountReading(3, 3),
      generateImageCountReading(4, 4),
      generateImageCountReading(5, 5),
      generateImageCountReading(6, 6),
      generateImageCountReading(7, 7),
      generateImageCountReading(8, 8),
      generateImageCountReading(9, 9),
      generateImageCountReading(10, 10),
    ].concat(
      ld.shuffle([
        generateImageCountReading(1, 1),
        generateImageCountReading(2, 2),
        generateImageCountReading(3, 3),
        generateImageCountReading(4, 4),
        generateImageCountReading(5, 5),
        generateImageCountReading(6, 6),
        generateImageCountReading(7, 7),
        generateImageCountReading(8, 8),
        generateImageCountReading(9, 9),
        generateImageCountReading(10, 10),
      ])
    ))
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>クッキーのかず</h1>
            <h1>
              かぞえられるかな？
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
