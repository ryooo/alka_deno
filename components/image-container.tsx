import React, { useState, useEffect } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export default function ImageContainer({
  imageName,
  count,
  perRow,
}: {
  imageName: string,
  count: number,
  perRow?: number,
}) {
  const [counts, setCounts] = useState([])
  useEffect(() => {
    let temp = Array(Math.floor(count / perRow)).fill(~~perRow)
    let rest = count % perRow
    if (rest > 0) {
      temp.push(rest)
    }
    setCounts(temp)
  }, [count, perRow])
  return (
    <div className="mx-auto" style={{ width: (perRow * 50) }}>
      {
        counts.map((rowCount, i) => {
          return (<div key={i} className="h-12 flex justify-start">
            {ld.times(rowCount, (j) => {
              return <div key={j} className={imageName + "-image " + imageName + "-image-" + ld.random(1, 36)}></div>
            })}
          </div>)
        })
      }
    </div >
  )
}
