import React, { useState, useRef, useEffect } from 'react'
import { getTitle } from '~/components/nav-list.tsx'
import MultipleBase from './multiple_base.tsx'

export default function PageMainContents({
  className,
}: {
  className?: string,
}) {
  return MultipleBase({ className, baseNum: 9 })
}

PageMainContents.meta = {
  title: getTitle(import.meta.url),
  className: "testPage",
}
