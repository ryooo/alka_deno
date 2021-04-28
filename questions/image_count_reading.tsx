import React from 'react'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { charToAnsers, kanaToHira } from '~/shared/util.ts'
import SpeakButton from '~/components/speak-button.tsx'

export const generateImageCountReading = (id, num, opt = {}) => {
  let ansers = []
  if (num === 1) {
    ansers.push("ヒトツ", "イッコ", "イチマイ")
  } else if (num === 2) {
    ansers.push("フタツ", "ニコ", "ニマイ")
  } else if (num === 3) {
    ansers.push("ミッツ", "サンコ", "サンマイ")
  } else if (num === 4) {
    ansers.push("ヨッツ", "ヨンコ", "ヨンマイ")
  } else if (num === 5) {
    ansers.push("イツツ", "ゴコ", "ゴマイ")
  } else if (num === 6) {
    ansers.push("ムッツ", "ロッコ", "ロクマイ")
  } else if (num === 7) {
    ansers.push("ナナツ", "ナナコ", "ナナマイ", "シチコ", "シチマイ")
  } else if (num === 8) {
    ansers.push("ヤッツ", "ハチコ", "ハチマイ")
  } else if (num === 9) {
    ansers.push("ココノツ", "キュウコ", "キュウマイ")
  } else if (num === 10) {
    ansers.push("ジュウ", "トオ", "ジュッコ", "ジュウマイ")
  }
  ansers = ansers.concat(charToAnsers(num))
  return {
    id,
    quiz: num,
    limitTime: opt.limitTime || 20,
    typicalAnser: kanaToHira(ansers[0]),
    renderer: (props) => {
      const shouldPulse = props.timeLimitPercent < 30
      return (
        <>
          <BarProgress percent={props.timeLimitPercent} />
          <div className={shouldPulse ? "animate-pulse quizFont" : "quizFont"}>
            <span id="quizText" style={{ fontSize: 2 + "rem" }}>
              クッキーがいくつあるか、わかるかな？
            </span>
            <SpeakButton textQuery="#quizText" />
            <ImageContainer imageName="cookies" count={props.question.quiz} perRow={5} />
          </div>
        </>
      )
    },
    test: (anser) => {
      for (let i in ansers) {
        if (anser.endsWith(ansers[i])) {
          return true
        }
      }
      return false
    }
  }
}
