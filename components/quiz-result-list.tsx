import React, { useMemo, useEffect, useState } from 'react'
import { useSetRecoilState } from '@recoil'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { canvasShow } from '~/components/result-canvas.tsx'
import SpeakButton from '~/components/speak-button.tsx'
import Button from '~/components/button.tsx'
import { findQuizHistory } from '~/hooks/use-indexed-db.ts'
import { BgmAtom } from '~/atoms/bgm-atom.ts'

export default function TestResultList({
  questions,
  scores,
}: {
  questions: any,
  scores: any,
}) {
  const [histories, setHistories] = useState([])
  const setBgm = useSetRecoilState(BgmAtom)
  useEffect(() => {
    setBgm({ file: "/bgm/21.mp3" })
    canvasShow(["Particles", { type: "playSe", se: "/se/clear.mp3" }])
    const loadHistories = async () => {
      const rows = await findQuizHistory(location.pathname)
      if (rows) {
        setHistories(rows.histories)
      }
    }
    loadHistories()
  }, [scores])
  const displayScore = (scores) => {
    if (scores === undefined) return ""
    const score = ld.mean(scores)
    if (score > 80) {
      return (<svg viewBox="0 0 448 512" style={{ width: "21px", color: "red" }}>
        <path fill="red" d="M 350.85 129 c 25.97 4.67 47.27 18.67 63.92 42 c 14.65 20.67 24.64 46.67 29.96 78 c 4.67 28.67 4.32 57.33 -1 86 c -7.99 47.33 -23.97 87 -47.94 119 c -28.64 38.67 -64.59 58 -107.87 58 c -10.66 0 -22.3 -3.33 -34.96 -10 c -8.66 -5.33 -18.31 -8 -28.97 -8 s -20.3 2.67 -28.97 8 c -12.66 6.67 -24.3 10 -34.96 10 c -43.28 0 -79.23 -19.33 -107.87 -58 c -23.97 -32 -39.95 -71.67 -47.94 -119 c -5.32 -28.67 -5.67 -57.33 -1 -86 c 5.32 -31.33 15.31 -57.33 29.96 -78 c 16.65 -23.33 37.95 -37.33 63.92 -42 c 15.98 -2.67 37.95 -0.33 65.92 7 c 23.97 6.67 44.28 14.67 60.93 24 c 16.65 -9.33 36.96 -17.33 60.93 -24 c 27.98 -7.33 49.96 -9.67 65.94 -7 z z"></path>
        <path fill="green" d="M 350.85 129 z m -54.94 -41 c -9.32 8.67 -21.65 15 -36.96 19 c -10.66 3.33 -22.3 5 -34.96 5 l -14.98 -1 c -1.33 -9.33 -1.33 -20 0 -32 c 2.67 -24 10.32 -42.33 22.97 -55 c 9.32 -8.67 21.65 -15 36.96 -19 c 10.66 -3.33 22.3 -5 34.96 -5 l 14.98 1 l 1 15 c 0 12.67 -1.67 24.33 -4.99 35 c -3.99 15.33 -10.31 27.67 -18.98 37 z"></path>
      </svg>)
    } else if (score > 0) {
      return (<svg viewBox="0 0 512 512" style={{ width: "21px", color: "sandybrown" }}><path fill="currentColor" d="M352 328c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zM184 192c0-13.26-10.75-24-24-24s-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24zm8 136c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm96-96c-13.25 0-24 10.74-24 24 0 13.25 10.75 24 24 24s24-10.75 24-24c0-13.26-10.75-24-24-24zm222.52 23.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45C249.57.5 242.9 0 236.26 0c-20.68 0-41.18 4.85-59.79 14.33l-69.13 35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0 0-12.82 80.95l12.08 76.28a132.555 132.555 0 0 0 37.16 72.96l54.77 54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.14c6.86 1.09 13.76 1.62 20.64 1.62 20.72 0 41.25-4.88 59.89-14.38l69.13-35.22a132.221 132.221 0 0 0 57.79-57.81l35.1-68.88c12.56-24.63 17.01-52.57 12.91-79.9zm-41.42 65.36L434 390.07c-9.68 19-24.83 34.15-43.81 43.82l-69.13 35.22C307.08 476.23 291.39 480 275.7 480c-5.21 0-10.47-.41-15.63-1.23l-76.7-12.14c-21-3.33-40.05-13.04-55.09-28.08l-54.77-54.76c-15.1-15.09-24.84-34.23-28.18-55.33l-12.08-76.27c-3.35-21.12.02-42.36 9.72-61.41l35.1-68.88c9.68-19 24.83-34.15 43.81-43.82L191 42.85c11.33-5.77 23.8-9.33 36.51-10.46 13.15 63.15 63.84 112.95 127.25 124.86 11.91 63.42 61.71 114.11 124.87 127.25-1.1 12.73-4.64 25.14-10.53 36.68z" ></path></svg>)
    } else {
      return ""
    }
  }
  const displayScoreByHistories = (histories, index, questionId) => {
    if (!histories || !histories[index] || !histories[index].scores) return ""
    return displayScore(histories[index].scores[questionId])
  }
  return useMemo(() => {
    let distinctQuestions = {}
    for (let i = 0; i < questions.length; i++) {
      distinctQuestions[questions[i].id] = questions[i]
    }
    return (
      <>
        <Button strong ruby onClick={() => { location.reload() }}>もう<ruby data-ruby="いちど">一度</ruby></Button>
        <div className="w-2/3 mx-auto">
          <div className="bg-white shadow-md rounded my-6">
            <table className="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500"><ruby data-ruby="もんだい">問題</ruby></th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500"><ruby data-ruby="こた">答</ruby>え</th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500"><ruby data-ruby="こんかい">今回</ruby>の<ruby data-ruby="けっか">結果</ruby></th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500">1<ruby data-ruby="かいまえ">回前</ruby></th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500">2<ruby data-ruby="かいまえ">回前</ruby></th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500">3<ruby data-ruby="かいまえ">回前</ruby></th>
                </tr>
              </thead>
              <tbody>
                {ld.map(distinctQuestions, (question, i) => {
                  return (
                    <tr className="hover:bg-gray-100" key={i}>
                      <td className="py-4 px-6 border-b border-gray-500">{question.quiz}</td>
                      <td className="py-4 px-6 border-b border-gray-500"><SpeakButton text={question.typicalAnser} size="small" />{question.typicalAnser}</td>
                      <td className="py-4 px-6 border-b border-gray-500">{displayScore(scores[question.id])}</td>
                      <td className="py-4 px-6 border-b border-gray-500">{displayScoreByHistories(histories, 1, question.id)}</td>
                      <td className="py-4 px-6 border-b border-gray-500">{displayScoreByHistories(histories, 2, question.id)}</td>
                      <td className="py-4 px-6 border-b border-gray-500">{displayScoreByHistories(histories, 3, question.id)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }, [questions, scores, histories])
}
