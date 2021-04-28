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
        generateJapaneseCharQuiz("四", ["シ"]),
        generateJapaneseCharQuiz("糸", ["イト", "シ"]),
        generateJapaneseCharQuiz("字", ["アザ", "ジ"]),
        generateJapaneseCharQuiz("耳", ["ミミ", "ジ"]),
        generateJapaneseCharQuiz("七", ["シチ"]),
        generateJapaneseCharQuiz("車", ["クルマ", "シャ"]),
        generateJapaneseCharQuiz("手", ["テ", "シュ"]),
        generateJapaneseCharQuiz("十", ["ジュウ"]),
        generateJapaneseCharQuiz("出", ["シュツ", "スイ"]),
        generateJapaneseCharQuiz("女", ["オンナ", "ジョ", "ニョ", "ニョウ", "ムスメ", "メ"]),
        generateJapaneseCharQuiz("小", ["ショウ", "オ", "コ"]),
        generateJapaneseCharQuiz("上", ["ウエ", "ショウ", "ジョウ", "カミ"]),
        generateJapaneseCharQuiz("森", ["モリ", "シン"]),
        generateJapaneseCharQuiz("人", ["ヒト", "ジン", "ニン"]),
        generateJapaneseCharQuiz("水", ["ミズ", "スイ"]),
        generateJapaneseCharQuiz("正", ["セイ", "マサ", "ショウ"]),
        generateJapaneseCharQuiz("生", ["セイ", "ショウ"]),
        generateJapaneseCharQuiz("青", ["アオ", "セイ", "ショウ"]),
        generateJapaneseCharQuiz("夕", ["ユウ", "セキ"]),
        generateJapaneseCharQuiz("石", ["イシ", "セキ", "コク", "シャク"]),
        generateJapaneseCharQuiz("赤", ["アカ", "セキ", "シャク"]),
        generateJapaneseCharQuiz("千", ["セン", "チ"]),
        generateJapaneseCharQuiz("川", ["カワ", "セン"]),
        generateJapaneseCharQuiz("先", ["サキ", "セン"]),
        generateJapaneseCharQuiz("早", ["ソウ", "サ", "ハヤ"]),
        generateJapaneseCharQuiz("草", ["クサ", "ソウ"]),
        generateJapaneseCharQuiz("足", ["アシ", "ソク"]),
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
