import React, { useState, useRef, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/nav-list.tsx'
import QuizManager from '~/components/quiz-manager.tsx'
import SpeakButton from '~/components/speak-button.tsx'
import { generateJapaneseCharQuiz } from '~/questions/japanese_char_quiz.tsx'
import { hiraToKana } from '~/shared/util.ts'

export default function PageMainContents({
  className,
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const descriptionRef = useRef()
  useEffect(() => {
    setQuestions(ld.shuffle(
      [
        generateJapaneseCharQuiz("青い", ["アオイ"]),
        generateJapaneseCharQuiz("夕べ", ["ユウベ"]),
        generateJapaneseCharQuiz("赤い", ["アカイ"]),
        generateJapaneseCharQuiz("先んじる", ["サキンジル"]),
        generateJapaneseCharQuiz("先ず", ["マズ", "マヅ"]),
        generateJapaneseCharQuiz("早い", ["ハヤイ"]),
        generateJapaneseCharQuiz("足す", ["タス"]),
        generateJapaneseCharQuiz("足りる", ["タリル"]),
        generateJapaneseCharQuiz("大きい", ["オオキイ"]),
        generateJapaneseCharQuiz("大いに", ["オオイニ"]),
        generateJapaneseCharQuiz("中る", ["アタル"]),
        generateJapaneseCharQuiz("二つ", ["フタツ"]),
        generateJapaneseCharQuiz("入る", ["イル", "ハイル"]),
        generateJapaneseCharQuiz("白い", ["シロイ"]),
        generateJapaneseCharQuiz("名のる", ["ナノル"]),
        generateJapaneseCharQuiz("立てる", ["タテル"]),
        generateJapaneseCharQuiz("力む", ["リキム"]),
      ]
    ))
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>おくりがなのある よみかた</h1>
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
