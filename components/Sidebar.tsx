import Image from "next/image";
import React, { useEffect, useState } from "react";

import { BsPlusSquare } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";

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
  const [createPlaylist,setCreatePlaylist] = useState();
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi, createPlaylist]);

  const createPlayList = () => {
    
    if (spotifyApi) {
      spotifyApi
        .createPlaylist(`My playlist #${playlists.length + 1}`)
        .then((res) => {
          console.log(res);
          setCreatePlaylist(playlists.length + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const linktoPlaylist =(playlistIdState:string) =>{
    console.log(playlistIdState)
      window.location.href = `/playlist/my/${playlistIdState}`;
  }
  return (
    <div className="bg-black h-full w-64 min-w-48">
      <div className="flex justify-start items-center mb-5 ">
        <RiSpotifyFill className="h-12 w-12 fill-slate-300 ml-6 mt-5 mr-2" />
        <Link href={"/"}>
          <span className="text-3xl text-white font-bold mt-5 cursor-pointer">
            <a>Spotify</a>
          </span>
        </Link>
      </div>
      <div className="mx-10">
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
          <div className="flex justify-start items-center  pb-5 cursor-pointer">
            <BsPlusSquare className="scale-150 fill-white" />
            <div className="pl-6 text-white" onClick={createPlayList}>
              Make the playlist
            </div>
          </div>
        </div>

        <hr className="my-5  w-48 h-px bg-gray-100  border-0  dark:bg-gray-700" />
        <div>
          {playlists &&
            playlists?.map((playlist, index) => (
              <div key={playlist.id + index}>
                {/* <Link href={`/playlist/my/${playlist.id}`}>
                  <div
                    key={playlist.id}
                    className="text-white pb-3 cursor-pointer"
                  >
                    <>
                      <a>{playlist.name}</a>
                    </>
                  </div>
                </Link> */}
                <div
                  className="text-white pb-3 cursor-pointer"
                  onClick={() => linktoPlaylist(playlist.id)}
                >
                  {playlist.name}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
