import React from 'react'
import { getTitle } from '~/components/navList.tsx'

export default function PageMainContents(props) {
    return (
        <h1>Hello, bba</h1>
    )
}

PageMainContents.meta = {
    title: getTitle(import.meta.url),
}