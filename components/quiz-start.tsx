import React, { useEffect } from 'react'
import { waitForKuromojiWorker } from '~/hooks/use-speech-recognition.ts'

export default function TestStart({
  description,
  onStart,
}: {
  description: any
  onStart: () => void,
}) {
  useEffect(() => {
    const waitAndStart = async () => {
      await waitForKuromojiWorker()
      window.kuromojiWorker.onmessage = (message) => {
        if (message.data.anser.endsWith("スタート")) {
          onStart()
        }
      }
    }
    waitAndStart()
  }, [onStart])

  return (
    <>
      <div className="text-center mb-16 quizFont">
        {description}
      </div>
      <div className="grid items-center justify-items-center quizFont">
        <div className="h-24 grid place-content-end">
          <svg className="animate-bounce w-12 " fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
        <button className="transition duration-150 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold w-3/5 py-2 rounded-full" onClick={onStart}>
          スタート！
        </button>
      </div>
    </>
  )
}
