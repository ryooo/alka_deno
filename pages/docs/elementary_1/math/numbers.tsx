import React, { useEffect, useState, useCallback } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'
import { getTitle } from '~/components/navList.tsx'
import TestStart from '~/components/test-start.tsx'
import BarProgress from '~/components/bar-progress.tsx'
import ImageContainer from '~/components/image-container.tsx'
import { ResultCanvas, showConfetti, showFailed } from '~/components/result_canvas.tsx'
import { useSpeechRecognition, waitForKuromojiWorker } from '~/hooks/useSpeechRecognition.ts'
import { number_to_ansers } from '~/shared/util.ts'

export default function PageMainContents({
  className
}: {
  className?: string,
}) {
  const [questions, setQuestions] = useState(null)
  const createQuestions = useCallback(async () => {
    await waitForKuromojiWorker()
    setQuestions(ld.shuffle(ld.times(10, (n) => {
      const num = n + 1
      const ansers = number_to_ansers(num)
      return {
        num: num, limitTime: 10, id: num, test: (anser) => {
          for (let i in ansers) {
            if (anser.endsWith(ansers[i])) {
              return true
            }
          }
          return false
        }
      }
    })))
  }, [])

  return (
    <div className={className}>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2">App Development</p>
              <div className="flex space-x-2 text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Marketing Team</p>
              </div>
              <div className="flex space-x-2 text-gray-400 text-sm my-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>1 Weeks Left</p>
              </div>
              <div className="border-t-2"></div>

              <div className="flex justify-between">
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Team Member</p>
                  <div className="flex space-x-2">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      className="w-6 h-6 rounded-full" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg"
                      className="w-6 h-6 rounded-full" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU"
                      className="w-6 h-6 rounded-full" />
                  </div>
                </div>
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Progress</p>
                  <div className="text-base text-gray-400 font-semibold">
                    <p>34%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-green-500 left-4 -top-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2">Web Design</p>
              <div className="flex space-x-2 text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Core UI Team</p>
              </div>
              <div className="flex space-x-2 text-gray-400 text-sm my-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>3 Weeks Left</p>
              </div>
              <div className="border-t-2 "></div>

              <div className="flex justify-between">
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Team Member</p>
                  <div className="flex space-x-2">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      className="w-6 h-6 rounded-full" />
                  </div>
                </div>
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Progress</p>
                  <div className="text-base text-gray-400 font-semibold">
                    <p>76%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2">Leading Page</p>
              <div className="flex space-x-2 text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Marketing Team</p>
              </div>
              <div className="flex space-x-2 text-gray-400 text-sm my-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>2 Days Left</p>
              </div>
              <div className="border-t-2 "></div>

              <div className="flex justify-between">
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Team Member</p>
                  <div className="flex space-x-2">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      className="w-6 h-6 rounded-full" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU"
                      className="w-6 h-6 rounded-full" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg"
                      className="w-6 h-6 rounded-full" />
                  </div>
                </div>
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Progress</p>
                  <div className="text-base text-gray-400 font-semibold">
                    <p>4%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-yellow-500 left-4 -top-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div className="mt-8">
              <p className="text-xl font-semibold my-2">Business Compare</p>
              <div className="flex space-x-2 text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Marketing Team</p>
              </div>
              <div className="flex space-x-2 text-gray-400 text-sm my-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>1 Month Left</p>
              </div>
              <div className="border-t-2 "></div>

              <div className="flex justify-between">
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Team Member</p>
                  <div className="flex space-x-2">
                    <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      className="w-6 h-6 rounded-full" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg"
                      className="w-6 h-6 rounded-full" />
                  </div>
                </div>
                <div className="my-2">
                  <p className="font-semibold text-base mb-2">Progress</p>
                  <div className="text-base text-gray-400 font-semibold">
                    <p>90%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="question">
        {questions === null ? (
          <TestStart
            description={(
              <>
                <h1>「スタート！」っていったら</h1>
                <h1>がめんにすうじがひょうじされます。</h1>
                <h1>ひょうじされたすうじをよみましょう。</h1>
              </>)}
            onStart={createQuestions} />) : (
          <TestQuestions questions={questions} />
        )}
      </div>
    </div>
  )
}

function TestQuestions({
  questions,
}: {
  questions: any,
}) {
  const [cleared, setCleared] = useState(false)
  const recognition = useSpeechRecognition()
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [percent, setPercent] = useState(100)

  const serveNextQuestion = useCallback(() => {
    const nextQuestion = questions.pop()
    if (nextQuestion === undefined) {
      setCleared(true)
    } else {
      setCurrentQuestion(nextQuestion)
    }
  }, [])

  useEffect(() => {
    serveNextQuestion()
    return () => {
      recognition?.destroy()
    }
  }, [questions, recognition])

  useEffect(() => {
    window.kuromojiWorker.onmessage = (message) => {
      if (currentQuestion.score) return
      if (currentQuestion.test(message.data.anser)) {
        recognition.reset()
        const score = percent
        currentQuestion.score = score
        showResultAndOnNext(score)
      }
    }

    const startAt = Date.now()
    function tick() {
      const rest = currentQuestion.limitTime - ((Date.now() - startAt) / 1000)
      setPercent(rest * 100 / currentQuestion.limitTime)
      if (rest <= 0) {
        clearInterval(timerId)
        showResultAndOnNext(0)
      }
    }
    const timerId = setInterval(tick, 30)
    return () => clearInterval(timerId)
  }, [currentQuestion])

  const showResultAndOnNext = useCallback((score) => {
    if (score >= 80) {
      showConfetti({ withParticle: true })
    } else if (score >= 1) {
      showConfetti()
    } else {
      showFailed()
    }
    setTimeout(() => { serveNextQuestion() }, 500)
  }, [])

  return (
    <div className="text-center">
      {cleared ? (
        <>クリア！</>
      ) : (
        currentQuestion === null ? (<>じゅんびちゅう...</>) :
          (<>
            <BarProgress percent={percent} />
            <ResultCanvas />
            <div className={percent < 20 && currentQuestion.score === undefined ? "animate-pulse" : ""}>
              <span style={{ fontSize: 15 + "rem" }}>
                {currentQuestion.num}
              </span>
              <ImageContainer imageName="cookies" count={currentQuestion.num} perRow={5} />
            </div>
          </>)
      )}
    </div>
  )
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
}
