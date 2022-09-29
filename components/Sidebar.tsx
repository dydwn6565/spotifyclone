import Image from "next/image";
import React, { useEffect, useState } from "react";
// import {
//     Home
// } from "@heroicons/react/outline"
import { BsPlusSquare } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { BiHeartSquare } from "react-icons/bi";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import {useRecoilState} from "recoil"
import { RiSpotifyFill } from "react-icons/ri";
import {playlistIdState, playlistState} from "../atoms/playlistAtom"
import Link from "next/link";
type Props = {};

function Sidebar({}: Props) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useRecoilState(playlistState);
  const [ playlistId,setPlaylistId]= useRecoilState (playlistIdState)

  // console.log("you picked >>"+ playlistId);
  // console.log(playlists);
  useEffect(() => {
    
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        // console.log(data.body.items);
      });
    } 
  }, [session, spotifyApi]);
  return (
    <div className="bg-black h-screen">
      <div className="flex justify-start items-center my-5">
        {/* <div className="text-3xl font-bold underline">Hello world!</div> */}

        
        <RiSpotifyFill className="h-10 w-10 fill-slate-300 ml-8 " />
        <span className="text-3xl text-white">Spotify</span>

        {/* <MagnifyingGlassIcon />
      <BookmarkSquareIcon /> */}
      </div>
      <div className="mx-10">
        <div className="flex justify-start items-center pb-5">
          <GrHomeRounded className="scale-150 fill-white" />
          <div className="pl-6 text-white">Home</div>
        </div>
        <div className="flex justify-start items-center  pb-5">
          <BsSearch className="scale-150 fill-white" />
          <div className="pl-6 text-white"> Search</div>
        </div>
        <div className="flex justify-start items-center  pb-9">
          <VscLibrary className="scale-150 fill-white" />
          <div className="pl-6 text-white">My Library</div>
        </div>
        <div>
          <div className="flex justify-start items-center  pb-5">
            <BsPlusSquare className="scale-150 fill-white" />
            <div className="pl-6 text-white">Make the playlist</div>
          </div>
          <div className="flex justify-start items-center  ">
            <BiHeartSquare className="scale-150 fill-white" />
            <div className="pl-6 text-white">Make the playlist</div>
          </div>
        </div>

        <hr className="my-1  w-48 h-px bg-gray-100  border-0 md:my-10 dark:bg-gray-700" />
        <div>
          {playlists &&
            playlists?.map((playlist) => (
              <>
                <Link href={`/playlist/${playlist.id}`}>
                  <div
                    key={playlist.id}
                    // onClick={() => setPlaylistId(playlist.id)}
                    className="text-white pb-3 cursor-pointer"
                  >
                    <>
                      <a>{playlist.name}</a>
                    </>
                  </div>
                </Link>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
