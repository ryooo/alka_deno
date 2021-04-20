import { useRouter } from 'framework/react'
import React, { useEffect, useState } from 'react'
import Button from '~/components/button.tsx'

export default function TestQuestion({
  question,
  onStart,
}: {
  question: any
  onStart: () => void,
}) {
  return (
    <>
      <div className="text-center">
        {question.jsx}
      </div>
    </>
  )
}
