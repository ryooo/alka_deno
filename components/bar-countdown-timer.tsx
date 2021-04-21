import { useRouter } from 'framework/react'
import React, { useEffect, useState } from 'react'
import Button from '~/components/button.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export default function BarCountdownTimer({
  limitTime,
  onReachLimit,
  question,
}: {
  limitTime: number,
  onReachLimit: () => void,
  question: any,
}) {
  const [restSec, setRestSec] = useState(limitTime)
  const [percent, setPercent] = useState(100)
  useEffect(() => {
    const startAt = Date.now()
    function tick() {
      const rest = limitTime - ((Date.now() - startAt) / 1000)
      setRestSec(rest)
      setPercent(rest * 100 / limitTime)
      if (rest <= 0 && typeof onReachLimit === "function") {
        clearInterval(timerId)
        onReachLimit()
      }
    }
    const timerId = setInterval(tick, 50)
    return () => clearInterval(timerId)
  }, [question])

  return (
    <>
      <div className="progress mt-5">
        <div className={"progress-bar " + (percent > 98 ? "transition-off" : "")} style={{ width: percent + "%" }}></div>
      </div>
    </>
  )
}
