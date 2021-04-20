import { useRouter } from 'framework/react'
import React, { useEffect, useState } from 'react'
import Button from '~/components/button.tsx'
import { useSpeechSynthesisUtterance } from '~/hooks/useSpeechSynthesisUtterance.ts'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export default function BarCountdownTimer({
  limitTime,
  onFinish
}: {
  limitTime: number,
  onFinish: () => void,
}) {
  const [restSec, setRestSec] = useState(limitTime)
  useEffect(() => {
    const startAt = Date.now()
    function tick() {
      setRestSec(limitTime - ((Date.now() - startAt) / 1000))
    }
    const timerId = setInterval(tick, 200)
    return () => clearInterval(timerId)
  }, [])

  return (
    <>
      <div className="progress mt-5">
        <div className="progress-bar" style={{ width: (restSec * 100 / limitTime) + "%" }}></div>
      </div>
    </>
  )
}
