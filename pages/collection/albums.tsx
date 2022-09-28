import React from 'react'
import Album from '../../components/Album';
import LibraryHead from '../../components/LibraryHead';
import Sidebar from '../../components/Sidebar';

type Props = {}

export default function albums({}: Props) {
  return (
    <div>
      <div className="grid  grid-cols-6 h-full">
        <Sidebar />

        <div className="col-span-5">
          <LibraryHead />
          <Album />
        </div>
      </div>
    </div>
  );
}