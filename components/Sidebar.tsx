import Image from "next/image";
import React, { useEffect, useState } from "react";

import { BsPlusSquare } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { BiHeartSquare } from "react-icons/bi";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { RiSpotifyFill } from "react-icons/ri";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Link from "next/link";
type Props = {};

function Sidebar({}: Props) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useRecoilState(playlistState);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <div className="bg-black h-full">
      <div className="flex justify-start items-center my-5">
        <RiSpotifyFill className="h-10 w-10 fill-slate-300 ml-8 " />
        <span className="text-3xl text-white">Spotify</span>
      </div>
      <div className="mx-10">
        {/* <div className="flex justify-start items-center pb-5"> */}
        <Link href={"/"}>
          <div className="text-white pb-3 cursor-pointer">
            <>
              <a>
                <div className="flex">
                  <GrHomeRounded className="scale-150 fill-white" />
                  <div className="pl-6 text-white">Home</div>
                </div>
              </a>
            </>
          </div>
        </Link>
        {/* </div> */}
        <Link href={"/search"}>
          <div className="text-white pb-3 cursor-pointer">
            <>
              <a>
                <div className="flex mt-5">
                  <BsSearch className="scale-150 fill-white" />
                  <div className="pl-6 text-white"> Search</div>
                </div>
              </a>
            </>
          </div>
        </Link>
        <Link href={"/collection/playlists"}>
          <div className="text-white pb-3 cursor-pointer">
            <>
              <a>
                <div className="flex my-5">
                  <VscLibrary className="scale-150 fill-white" />
                  <div className="pl-6 text-white">My Library</div>
                </div>
              </a>
            </>
          </div>
        </Link>


        <div>
          <div className="flex justify-start items-center  pb-5">
            <BsPlusSquare className="scale-150 fill-white" />
            <div className="pl-6 text-white">Make the playlist</div>
          </div>
          {/* <div className="flex justify-start items-center  ">
            <BiHeartSquare className="scale-150 fill-white" />
            <div className="pl-6 text-white">Make the playlist</div>
          </div> */}
        </div>

        <hr className="my-1  w-48 h-px bg-gray-100  border-0 md:my-10 dark:bg-gray-700" />
        <div>
          {playlists &&
            playlists?.map((playlist) => (
              <>
                <Link href={`/playlist/${playlist.id}`}>
                  <div
                    key={playlist.id}
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
