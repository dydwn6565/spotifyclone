import React from 'react'
import MyPlaylist from '../../../components/MyPlaylist';
import Player from '../../../components/Player';
import Sidebar from '../../../components/Sidebar';

type Props = {}

const myplaylistid = (props: Props) => {
  return (
    <div>
      <>
        <div className="grid  grid-cols-6 h-full">
          <Sidebar />

          <div className="col-span-5">
            <MyPlaylist />
          </div>
        </div>
        <Player />
      </>
    </div>
  );
}

export default myplaylistid