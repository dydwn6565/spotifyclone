import React from "react";
import Head from "../../components/Head";
import MyPlaylist from "../../components/MyPlaylist";
import Player from "../../components/Player";
import Playlist from "../../components/Playlist";
import Sidebar from "../../components/Sidebar";

type Props = {};

function playlistid({}: Props) {
  return (
    <div>
      <>
        <div className="grid  grid-cols-6 h-full">
          <Sidebar />

          <div className="col-span-5">
            <Playlist />
          </div>
        </div>
        <Player />
      </>
    </div>
  );
}

export default playlistid;
