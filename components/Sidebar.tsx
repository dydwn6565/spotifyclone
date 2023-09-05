import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";

import { BsPlusSquare } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";

import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { RiSpotifyFill } from "react-icons/ri";
import {  playlistState } from "../atoms/playlistAtom";
import Link from "next/link";
import useDebounce from "../hooks/useDebounce";
import { debounce } from "lodash";

type Props = {};

function Sidebar({}: Props) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useRecoilState(playlistState);
  const [createPlaylist, setCreatePlaylist] = useState();
  const [clickedPlaylist, setClickedPlaylist] = useState("");
  const [addPlaylist, setAddPlaylist] = useState(false);
  const buttonRef = useRef(null);
  const addPlaylistRef = useRef(null);
  // const debounceVal = useDebounce(playlists.length);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi, createPlaylist]);
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [clickedPlaylist]);

  useEffect(() => {
    if (addPlaylistRef.current) {
      addPlaylistRef.current.focus();
    }
  }, [addPlaylist]);

  const createPlayList = () => {
    if (spotifyApi) {
      spotifyApi
        .createPlaylist(`My playlist #${playlists.length + 1}`)
        .then((res) => {
          setCreatePlaylist(playlists.length + 1);
        })
        .then(() => {
          setAddPlaylist(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const debouncedChangeHandler = useCallback(debounce(createPlayList, 200), []);
  const linktoPlaylist = (
    e: React.MouseEvent<HTMLDivElement>,
    playlistIdState: string
  ) => {
    e.preventDefault();
    window.location.href = `/playlist/my/${playlistIdState}`;
  };

  const extendPlaylist = (
    e: React.MouseEvent<HTMLDivElement>,
    playlistId: string
  ) => {
    e.preventDefault();

    setClickedPlaylist(playlistId);
  };

  const deletePlaylist = async (
    e: React.MouseEvent<HTMLDivElement>,
    playlistId: string
  ) => {
    e.preventDefault();

    try {
      if (spotifyApi) {
        spotifyApi
          .unfollowPlaylist(playlistId)
          .then((res) => {
            console.log(res);
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      alert(error);
    }
  };
  const onblurDeleteAddPlaylist = () => {
    setAddPlaylist(false);
  };
  function showAddPlaylist() {
    setAddPlaylist(true);
  }
  function onblurDeletePlaylist() {
    console.log("onblur");
    setClickedPlaylist("");
  }
  return (
    <div className="bg-black h-full  w-64">
      <div className="flex justify-start items-center mb-5 ">
        <div className="h-12 w-12 fill-slate-300  mt-6 mr-2">
          <Image src="/logo192.png" width={50} height={50} />
        </div>
        {/* <RiSpotifyFill className="h-12 w-12 fill-slate-300 ml-6 mt-5 mr-2" /> */}
        <Link href={"/"}>
          <span className="text-3xl text-white font-bold mt-5 cursor-pointer">
            <a>Music Land</a>
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
        {/* <Link href={"/collection/playlists"}>
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
        </Link> */}

        <div>
          <div className="flex justify-start items-center  pb-5 cursor-pointer mt-5">
            <BsPlusSquare className="scale-150 fill-white" />
            <div className="pl-6 text-white " onClick={showAddPlaylist}>
              Make the playlist
            </div>
          </div>
          {addPlaylist && (
            <div className="absolute w-32  h-12 bg-gray-500 outline-none cursor-pointer z-40 ml-24 flex items-center justify-center rounded-lg">
              <div
                onClick={debouncedChangeHandler}
                ref={addPlaylistRef}
                onBlur={onblurDeleteAddPlaylist}
                tabIndex={0}
              >
                Add Playlist
              </div>
            </div>
          )}
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
                  className="text-white pb-3 cursor-pointer z-20"
                  onClick={(e) => linktoPlaylist(e, playlist.id)}
                  onContextMenu={(e) => extendPlaylist(e, playlist.id)}
                >
                  {playlist.name}
                </div>

                {clickedPlaylist == playlist.id ? (
                  <div
                    ref={buttonRef}
                    className="absolute w-32  h-12 bg-gray-500 outline-none cursor-pointer z-40 ml-24 flex items-center justify-center rounded-lg hover:bg-white text-black"
                    onClick={(e) => {
                      deletePlaylist(e, playlist.id);
                    }}
                    // onFocus={(e) => {
                    //   deletePlaylist(e, playlist.id);
                    // }}

                    onBlur={onblurDeletePlaylist}
                    tabIndex={0}
                  >
                    Delete playlist
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
