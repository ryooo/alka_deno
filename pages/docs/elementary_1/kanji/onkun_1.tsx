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
        generateJapaneseCharQuiz("一", ["イチ", "カズ", "イツ", "ハジメ", "ヒト"]),
        generateJapaneseCharQuiz("右", ["ミギ", "ウ", "ユウ"]),
        generateJapaneseCharQuiz("雨", ["アマ", "ウ", "アメ"]),
        generateJapaneseCharQuiz("円", ["マル", "エン"]),
        generateJapaneseCharQuiz("王", ["オウ"]),
        generateJapaneseCharQuiz("音", ["オト", "オン", "イン", "ネ"]),
        generateJapaneseCharQuiz("下", ["シタ", "カ", "ゲ", "シモ", "モト"]),
        generateJapaneseCharQuiz("火", ["ヒ", "カ"]),
        generateJapaneseCharQuiz("花", ["ハナ", "カ"]),
        generateJapaneseCharQuiz("貝", ["カイ", "バイ"]),
        generateJapaneseCharQuiz("学", ["ガク", "マナブ"]),
        generateJapaneseCharQuiz("気", ["キ", "ケ"]),
        generateJapaneseCharQuiz("九", ["キュウ", "ク"]),
        generateJapaneseCharQuiz("休", ["キュウ"]),
        generateJapaneseCharQuiz("玉", ["タマ", "ギョク"]),
        generateJapaneseCharQuiz("金", ["カネ", "キン", "コン"]),
        generateJapaneseCharQuiz("空", ["ソラ", "カラ", "クウ"]),
        generateJapaneseCharQuiz("月", ["ツキ", "ゲツ", "ガツ"]),
        generateJapaneseCharQuiz("犬", ["イヌ", "ケン"]),
        generateJapaneseCharQuiz("見", ["ケン"]),
        generateJapaneseCharQuiz("五", ["ゴ"]),
        generateJapaneseCharQuiz("口", ["クチ", "コウ", "ク"]),
        generateJapaneseCharQuiz("校", ["コウ", "キョウ"]),
        generateJapaneseCharQuiz("左", ["ヒダリ", "サ"]),
        generateJapaneseCharQuiz("三", ["サン", "サブ"]),
        generateJapaneseCharQuiz("山", ["ヤマ", "サン", "セン"]),
        generateJapaneseCharQuiz("子", ["コ", "シ", "ス"]),
      ]
    ))
  }, [])

  return (
    <div className={className}>
      <div className="quizBase">
        <QuizManager questions={questions} description={(
          <div ref={descriptionRef}>
            <h1>おくりがなのない よみかた</h1>
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

// # 漢字 問題 生成方法
// # https://origamijapan.net/abc/kanji-grade-1/
// function hiraToKana(str) {
//   return str.replace(/[\u3041-\u3096]/g, function (match) {
//     var chr = match.charCodeAt(0) + 0x60
//     return String.fromCharCode(chr)
//   })
// }

// ret = jQuery.map(document.querySelectorAll("table td"), function(a) {
//   strs = a.innerText.split("\n")
//   kanji = '"' + strs.shift() + '"'
//   yomis = []
//   withOkuri = []
//   firstKunyomi = null
//   for(var i = 0; i < strs.length; i++) {
//     yomi = strs[i]
//     if (yomi.indexOf("(") >= 0) {
//       withOkuri.push('"'+hiraToKana(yomi)+'"')
//     } else {
//       kana = hiraToKana(yomi)
//       if (yomi != kana && firstKunyomi == null) {
//         firstKunyomi = kana
//         yomis.unshift('"'+kana+'"')
//       } else {
//        yomis.push('"'+kana+'"')
//       }
//     }
//   }
//   return {kanji, yomis, withOkuri}
// })

// ret2 = jQuery.map(ret, function(a) {
//   return "generateJapaneseCharQuiz("+a.kanji+", ["+a.yomis.join()+"])"
// })
// ret2.join()

// ret3 = jQuery.map(ret, function(a) {
//   if (a.withOkuri.length == 0) {return}
//   return "generateJapaneseCharQuiz("+a.kanji+", ["+a.withOkuri.join()+"])"
// })
// ret3.join()
