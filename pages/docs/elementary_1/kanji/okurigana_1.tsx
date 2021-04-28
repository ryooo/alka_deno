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
        generateJapaneseCharQuiz("一つ", ["ヒトツ"]),
        generateJapaneseCharQuiz("円い", ["マルイ"]),
        generateJapaneseCharQuiz("九つ", ["ココノツ"]),
        generateJapaneseCharQuiz("休む", ["ヤスム"]),
        generateJapaneseCharQuiz("空く", ["アク"]),
        generateJapaneseCharQuiz("見える", ["ミエル", "マミエル"]),
        generateJapaneseCharQuiz("五つ", ["イツツ"]),
        generateJapaneseCharQuiz("三つ", ["ミッツ"]),
        generateJapaneseCharQuiz("四つ", ["ヨッツ"]),
        generateJapaneseCharQuiz("七つ", ["ナナツ"]),
        generateJapaneseCharQuiz("手ずから", ["テズカラ"]),
        generateJapaneseCharQuiz("出す", ["ダス"]),
        generateJapaneseCharQuiz("小さい", ["チイサイ"]),
        generateJapaneseCharQuiz("上る", ["ノボル"]),
        generateJapaneseCharQuiz("正しい", ["タダシイ"]),
        generateJapaneseCharQuiz("生きる", ["イキル"]),
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
