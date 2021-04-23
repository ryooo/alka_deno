import { useRouter } from 'framework/react'
import React, { useEffect, useState, useCallback } from 'react'
import Button from '~/components/button.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'

export default function TestStart({
  description,
  onStart,
}: {
  description: any
  onStart: () => void,
}) {
  const [enableVoiceButton, SetEnableVoiceButton] = useState(false)
  useEffect(() => {
    SetEnableVoiceButton(true)
  }, [description])

  const speech = useCallback(() => {
    const speakText = "aa" //description.props.children.map((c, i) => { return c.props.children }).join("")
    SetEnableVoiceButton(false)
    useSpeechSynthesisUtterance(speakText, () => {
      SetEnableVoiceButton(true)
      onStart()
    })
  })
  return (
    <>
      <div className="text-center mb-32">
        {description}
      </div>
      <div className="grid items-center justify-items-center">
        <div className="h-24 grid place-content-end">
          {enableVoiceButton && (
            <svg className="animate-bounce w-12 " fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          )}
        </div>
        {enableVoiceButton ? (
          <button className="transition duration-150 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold w-3/5 py-2 rounded-full" onClick={speech}>
            もんだいをよむ
          </button>
        ) : (
          <button className="bg-gray-500 text-white font-bold w-3/5 py-2 rounded-full">
            もんだいをよむ
          </button>
        )}
      </div>
    </>
  )
}
