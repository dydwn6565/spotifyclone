
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import {  playlistState } from "../atoms/playlistAtom";


type Props = {};

function EmptyPlaylistsImage({}: Props) {
  const [playlist, setPlaylist] = useRecoilState(playlistState);

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
      {playlist?.map((song,index) => (
        <>
          <div
            className="h-72 w-48 mt-20 ml-5 bg-neutral-800 flex items-center flex-col"
            key={song?.name+index}
          >
            {song.images[0] === undefined ? (
              <div className="mt-7">
                <Image
                  height={"144px"}
                  width={"144px"}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2y2NpnUpDEDvCxwLfPw-VdQvuSnBFXExyw&usqp=CAU"
                  alt=""
                />
              </div>
            ) : (
              <Image width={"144px"} height={"144px"}
                src={song?.images[0]?.url}
                alt={song?.name}
                className="mt-7"
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

export default EmptyPlaylistsImage;
