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
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">City</th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">New York</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a>
                </td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Paris</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a>
                </td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">London</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a>
                </td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Oslo</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a>
                </td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Mexico City</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
                  <a href="#" className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
