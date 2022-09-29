import React from 'react'
import { useRecoilState } from 'recoil';
import { playlistState } from '../../atoms/playlistAtom';
import LibraryHead from '../../components/LibraryHead';
import Playlists from '../../components/Playlists';


import Sidebar from '../../components/Sidebar'
import useSpotify from '../../hooks/useSpotify';

type Props = {}

function mylibrary({}: Props) {
  
  // const [playlist, setPlaylist] = useRecoilState(playlistState);
  // console.log(playlist); 
  return (
    <div>
      <div className="grid  grid-cols-6 h-full">
        <Sidebar />

        <div className="col-span-5">
          <LibraryHead />
          <Playlists />
          
        </div>
      </div>
    </div>
  );
}

export default mylibrary