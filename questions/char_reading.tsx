import React from 'react'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { charToAnsers, kanaToHira } from '~/shared/util.ts'

export const generateCharReading = (id, char, opt = {}) => {
  const ansers = charToAnsers(char)
  return {
    id,
    quiz: char,
    limitTime: opt.limitTime || 20,
    typicalAnser: kanaToHira(ansers[0]),
    renderer: (props) => {
      return (
        <>
          <BarProgress percent={props.timeLimitPercent} />
          <div className={props.shouldPulse ? "animate-pulse quizFont" : "quizFont"}>
            <span style={{ fontSize: 15 + "rem" }}>
              {props.question.quiz}
            </span>
            < ImageContainer imageName="cookies" count={props.question.quiz} perRow={5} />
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
