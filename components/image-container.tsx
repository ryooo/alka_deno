import React, { useState, useEffect, useMemo } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export default function ImageContainer({
  ...props
}) {
  const [counts, setCounts] = useState([])
  useEffect(() => {
    let temp = Array(Math.floor(props.count / props.perRow)).fill(~~props.perRow)
    let rest = props.count % props.perRow
    if (rest > 0) {
      temp.push(rest)
    }
    setCounts(temp)
  }, [props.count, props.perRow])

  return useMemo(() => {
    return (counts.map((rowCount, i) => {
      return (
        <div key={i} className="mx-auto" style={{ width: (props.perRow * 50) }}>
          <div className="h-12 flex justify-start mt-4">
            {ld.times(rowCount, (j) => {
              return <div key={j} className={props.imageName + "-image " + props.imageName + "-image-" + ld.random(1, 36)}></div>
            })}
          </div>
        </div >)
    }))
  }, [counts])
}
