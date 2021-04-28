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
        generateJapaneseCharQuiz("村", ["ムラ", "ソン"]),
        generateJapaneseCharQuiz("大", ["ダイ", "タイ"]),
        generateJapaneseCharQuiz("男", ["オトコ", "ダン", "ナン"]),
        generateJapaneseCharQuiz("竹", ["タケ", "チク"]),
        generateJapaneseCharQuiz("中", ["ナカ", "ウチ", "チュウ"]),
        generateJapaneseCharQuiz("虫", ["ムシ", "チュウ"]),
        generateJapaneseCharQuiz("町", ["マチ", "チョウ"]),
        generateJapaneseCharQuiz("天", ["テン", "アメ"]),
        generateJapaneseCharQuiz("田", ["タ", "デン"]),
        generateJapaneseCharQuiz("土", ["ツチ", "ト", "ド"]),
        generateJapaneseCharQuiz("二", ["ニ", "ジ"]),
        generateJapaneseCharQuiz("日", ["ニチ", "カ", "ジツ", "ヒ"]),
        generateJapaneseCharQuiz("入", ["ニュウ", "ハイル"]),
        generateJapaneseCharQuiz("年", ["トシ", "ネン", "ミノル"]),
        generateJapaneseCharQuiz("白", ["シロ", "ハク", "ビャク"]),
        generateJapaneseCharQuiz("八", ["ハチ"]),
        generateJapaneseCharQuiz("百", ["ヒャク", "モモ"]),
        generateJapaneseCharQuiz("文", ["ブン", "アヤ", "モン", "フミ"]),
        generateJapaneseCharQuiz("木", ["キ", "モク", "ボク"]),
        generateJapaneseCharQuiz("本", ["ホン", "モト"]),
        generateJapaneseCharQuiz("名", ["ナ", "ミョウ", "メイ"]),
        generateJapaneseCharQuiz("目", ["メ", "ボク", "モク"]),
        generateJapaneseCharQuiz("立", ["リツ", "タツ", "リュウ"]),
        generateJapaneseCharQuiz("力", ["チカラ", "リキ", "リョク"]),
        generateJapaneseCharQuiz("林", ["ハヤシ", "リン"]),
        generateJapaneseCharQuiz("六", ["ロク", "リク"]),
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
