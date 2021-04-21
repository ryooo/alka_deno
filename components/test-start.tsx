import { useRouter } from 'framework/react'
import React, { useEffect, useState } from 'react'
import Button from '~/components/button.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'

export default function TestStart({
  description,
  onStart,
}: {
  description: any
  onStart: () => void,
}) {
  const [showStart, SetShowStart] = useState(false)
  useEffect(() => {
    const speakText = "aa" //description.props.children.map((c, i) => { return c.props.children }).join("")
    useSpeechSynthesisUtterance(speakText, () => {
      SetShowStart(true)
    })
  }, [description])
  return (
    <>
      <div className="text-center">
        {description}
      </div>
      {showStart && (
        <>
          <div className="h-24 grid items-center justify-items-center mt-32">
            <svg className="animate-bounce w-12" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            <button className="transition duration-500 ease-in-out transform bg-blue-500 hover:bg-blue-700 hover:-translate-y-1 hover:scale-110 text-white font-bold w-3/5 py-2 px-4 rounded-full" onClick={onStart}>
              スタート！
            </button>
          </div>
        </>
      )}
    </>
  )
}
