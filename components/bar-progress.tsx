import React, { useEffect, useState } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export default function BarProgress({
  percent,
  transitionOff,
}: {
  percent: number,
  transitionOff?: boolean,
}) {
  return (
    <>
      <div className="progress mt-5">
        <div className={"progress-bar " + (transitionOff === true ? "transition-off" : "")} style={{ width: percent + "%" }}></div>
      </div>
    </>
  )
}
