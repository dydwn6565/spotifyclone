import { sortedIndex } from "lodash";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

type Props = {};

function Playlists({}: Props) {
  const spotifyApi = useSpotify();

  const [playlist, setPlaylist] = useRecoilState(playlistState);
  console.log(playlist);
  return (
    <div className=" bg-neutral-900 h-screen flex">
      <div>
        <div className="text-3xl ml-10  text-white mt-6 ">Playlists</div>
        <div className="h-72 w-128 bg-gradient-to-r from-blue-800 to-indigo-500 ml-10 rounded-lg mt-5">
          <div className="flex  flex-col ml-5 absolute mt-20">
            <div className="text-white my-5">IVE After LIKE</div>
            <div className="text-white text-3xl my-5">My favorite song</div>
            <div className="text-white ">My favorite song</div>
          </div>
        </div>
        <div></div>
      </div>
      {playlist?.map((song) => (
        <>
          <div
            className="h-72 w-48 mt-20 ml-5 bg-neutral-800 flex items-center flex-col"
            key={song?.name}
          >
            {song.images[0] === undefined ? (
              <img
                className="h-36 w-36 mt-7 "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2y2NpnUpDEDvCxwLfPw-VdQvuSnBFXExyw&usqp=CAU"
                alt=""
              />
            ) : (
              <img
                src={song?.images[0]?.url}
                alt={song?.name}
                className="h-36 w-36 mt-7"
              />
            )}
            <div className="text-white my-3">{song.name}</div>
            <div className="text-white">Made by {song.owner.display_name}</div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Playlists;
