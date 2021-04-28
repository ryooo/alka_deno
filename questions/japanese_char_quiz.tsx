import React from 'react'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { charToAnsers, kanaToHira } from '~/shared/util.ts'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export const generateJapaneseCharQuiz = (id, ansers, opt = {}) => {
  return {
    id,
    quiz: id,
    limitTime: opt.limitTime || 20,
    typicalAnser: kanaToHira(ansers[0]),
    renderer: (props) => {
      const shouldPulse = props.timeLimitPercent < 50
      return (
        <>
          <BarProgress percent={props.timeLimitPercent} />
          <div className={shouldPulse ? "animate-pulse quizFont" : "quizFont"}>
            <span style={{ fontSize: 15 + "rem" }}>
              {id}
            </span>
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
