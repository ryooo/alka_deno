import { useRouter } from 'framework/react'
import React, { useState } from 'react'

interface LineContent {
  innerHtml: string,
  margin: boolean,
};

export default function TestStart({
  lineContents,
}: {
  lineContents: LineContent[]
}) {
  return (
    <>
      {lineContents.map((lineContent, i) => {
        return lineContent.innerHtml
      })}
    </>
  )
}
