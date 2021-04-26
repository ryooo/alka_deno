import React, { useEffect, useState } from 'react'
import { ld } from 'https://x.nest.land/deno-lodash@1.0.0/mod.ts'

export default function TestResultList({
  questions,
}: {
  questions: any,
}) {
  return (
    <>
      <div className="w-2/3 mx-auto">
        <div className="bg-white shadow-md rounded my-6">
          <table className="text-left w-full border-collapse">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500"><ruby data-ruby="もんだい">問題</ruby></th>
                <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500"><ruby data-ruby="こた">答</ruby>え</th>
                <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-dark border-b border-gray-500"><ruby data-ruby="てんすう">点数</ruby></th>
              </tr>
            </thead>
            <tbody>
              {ld.map(questions, (question, i) => {
                return (
                  <tr className="hover:bg-gray-100" key={i}>
                    <td className="py-4 px-6 border-b border-gray-500">{question.quiz}</td>
                    <td className="py-4 px-6 border-b border-gray-500">{question.typicalAnser}</td>
                    <td className="py-4 px-6 border-b border-gray-500">{question.score}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
