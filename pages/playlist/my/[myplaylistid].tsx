import React from 'react'
import MyPlaylist from '../../../components/MyPlaylist';
import Player from '../../../components/Player';
import Sidebar from '../../../components/Sidebar';

type Props = {}

const myplaylistid = (props: Props) => {
  return (
    
      <>
        <div className="flex  ">
          <div className='mdl:hidden'>

          <Sidebar />
          </div>

          <div  >
            <MyPlaylist />
          </div>
        </div>
        <Player />
      </>
    
  );
}

export default myplaylistid