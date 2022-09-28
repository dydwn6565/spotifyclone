import React from 'react'
import Artist from '../../components/Artist'
import LibraryHead from '../../components/LibraryHead'
import Sidebar from '../../components/Sidebar'

type Props = {}

export default function artists({}: Props) {
  return (
     <div>
      <div className="grid  grid-cols-6 h-full">
        <Sidebar />

        <div className="col-span-5">
          <LibraryHead />
          <Artist/>
        </div>
      </div>
    </div>
  )
}