import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilState } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { divide, shuffle } from "lodash";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";
import { BsMusicNoteBeamed } from "react-icons/bs";
import convertmsToMinutes from "../lib/convertmsToMinutes";
import { millisToMinutesAndSeconds } from "../lib/millisToMinutesAndSeconds";
import MyPlaylistSearch from "./MyPlaylistSearch";
type Props = {};

const colorList = ["blue", "green", "pink"];

function MyPlaylist({}: Props) {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const pathname = router.asPath.split("/")[2];

  const [playlists, setPlaylists] = useRecoilState(playlistState);
  const [color, setColor] = useState<string | undefined>("blue");
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();
  const [track, setTrack] = useState<any>();
  const [recommendedSong, setRecommendedSong] = useState<any>();


  
  useEffect(() => {
    const filterdPlayList = playlists?.filter((album) => {
      return album.id === pathname;
    });
    // console.log(filterdPlayList);
    setSelectedPlaylist(filterdPlayList);
  }, [pathname, playlists]);

  useEffect(() => {
    setColor(shuffle(colorList).pop());
  }, [pathname, playlists]);

  useEffect(() => {
    if (selectedPlaylist && selectedPlaylist[0]?.images[0] !== undefined) {
      axios
        .get(selectedPlaylist[0]?.tracks.href, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getCredentials().accessToken}`,
          },
        })
        .then((res) => {
          setTrack(res);
          //   console.log(res)
          let albumIdList = [];
          res.data.items.map((album) =>
            // console.log(album.track.album.id)
            albumIdList.push(album.track.artists[0].id)
          );
          // console.log(albumIdList)
          spotifyApi
            .getRecommendations({
              min_energy: 0.4,
              seed_artists: albumIdList,
              min_popularity: 82,
              limit: 10,
            })
            .then((result) => {
              console.log(result);
              setRecommendedSong(result);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedPlaylist, pathname, spotifyApi]);

  //   useEffect(()=>{
  //     spotifyApi.getRecommendations()
  //   })
  const subtractDate = (addedDate: string) => {
    // const daysBetween = new Date().getDate() - new Date(addedDate).getDate();
    const daysBetween = new Date().getDate() - new Date(addedDate).getDate();
    return daysBetween;
  };

  console.log(selectedPlaylist);
  return (
    <div
      className={
        selectedPlaylist && selectedPlaylist[0]?.images[0] !== undefined
          ? "w-full h-full bg-gradient-to-b from-blue-500 to-black"
          : "w-full h-full bg-slate-900"
      }
    >
      {/* <div className={`w-full h-128 bg-gradient-to-b ${color} to-black`}> */}
      <>{/* {console.log(color)} */}</>
      <div
      // className={
      //   color === "blue"
      //     ? `w-full h-196 bg-gradient-to-b from-blue-500 to-white`
      //     : `w-full h-196 bg-gradient-to-b from-blue-500 to-white`
      // }
      >
        <div className="flex justify-between ">
          <div className="flex flex-row p-5 space-x-5">
            <div className="h-10 w-10 rounded-full bg-black flex items-center">
              <IoIosArrowBack className="w-8 h-8  text-white" />
            </div>
            <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
              <IoIosArrowForward className="w-8 h-8  text-white" />
            </div>
          </div>
          <div className="flex flex-row p-5 space-x-10 text-lg ">
            <div className="text-white mt-1">Sign up</div>
            <div className="w-36 h-10 bg-white rounded-full">
              <div className="text-black flex justify-center items-center mt-1">
                <Link href="/login">
                  <a>Log in</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          {selectedPlaylist && selectedPlaylist[0]?.images[0] === undefined ? (
            <div className="h-72 w-72 bg-slate-700 ml-7 flex items-center justify-center">
              <div className="text-7xl ">
                <BsMusicNoteBeamed />
              </div>
            </div>
          ) : (
            <img
              src={selectedPlaylist && selectedPlaylist[0].images[0].url}
              alt={selectedPlaylist && selectedPlaylist[0].name}
              className="w-72 h-72 ml-7"
            />
          )}
          {/* <img
            src={ selectedPlaylist && selectedPlaylist[0].images[0].url }
            alt={selectedPlaylist && selectedPlaylist[0].name}
            className="w-72 h-72 ml-7"
          /> */}
          <div>
            <div className="text-white ml-5 mt-10">
              {selectedPlaylist && selectedPlaylist[0].type}
            </div>
            <div className="text-white text-8xl ml-3 mt-5">
              {selectedPlaylist && selectedPlaylist[0].name}
            </div>

            <div className="flex space-x-1 mt-20 ml-5">
              <div className="text-white">
                {selectedPlaylist && selectedPlaylist[0].owner.display_name}
              </div>
              {selectedPlaylist &&
                selectedPlaylist[0]?.images[0] !== undefined && (
                  <div className="text-white">
                    {selectedPlaylist &&
                      selectedPlaylist[0].tracks.total + "  songs"}
                  </div>
                )}
            </div>
          </div>
        </div>
        {/* <div
          className={
            selectedPlaylist && selectedPlaylist[0]?.images[0] !== undefined
              ? "h-screen bg-gradient-to-b from-transparent  to-black"
              : "h-screen bg-slate-900"
          }
        > */}
          {/* <div className=""> */}
          {selectedPlaylist && selectedPlaylist[0]?.images[0] !== undefined && (
            <div className="grid grid-cols-12 mt-10 text-white mb-5">
              <div className="col-span-5 ml-10"># Title</div>
              <div className="col-span-2 ">Album</div>
              <div className="col-span-2 ml-12 ">Added Date</div>
              <div className="col-span-1 ml-24">
                <AiOutlineClockCircle />
              </div>
            </div>
          )}
          <hr className="ml-10 mr-10 bg-transparent my-5" />
          <div>
            {selectedPlaylist &&
              selectedPlaylist[0]?.images[0] !== undefined &&
              track?.data.items.map((song, index) => (
                <>
                  <div className="  ml-10 p-2 grid grid-cols-11 items-center">
                    <div className="text-white flex -ml-2  col-span-4">
                      <div className="mr-5 mt-2">{index + 1}</div>
                      <img
                        className="h-12 w-12 "
                        src={song.track.album.images[0].url}
                        alt={song.track.album.id}
                      />
                      <div className=" text-white ml-2 ">
                        <div>{song.track.name}</div>
                        <div>{song.track.artists[0].name}</div>
                      </div>
                    </div>
                    <div className="col-span-3 text-white">
                      {song.track.album.name}
                    </div>

                    <div className="col-span-2 text-white">
                      {subtractDate(song.added_at)}
                    </div>
                    <div className="text-white">
                      {millisToMinutesAndSeconds(song.track.duration_ms)}
                    </div>
                  </div>
                </>
              ))}
          </div>
          {selectedPlaylist && selectedPlaylist[0]?.images[0] === undefined ? (
            <div className="text-2xl ml-10 mt-5 text-white">
              Find your sone to add into your Playlist
            </div>
          ) : (
            <>
              <div className="text-2xl ml-10 text-white my-5">Recommend</div>
              <div className="text-lg ml-10 text-white mb-3">
                Based on Song in this Playlist
              </div>
            </>
          )}
          <div>
            {selectedPlaylist &&
            selectedPlaylist[0]?.images[0] !== undefined ? (
              recommendedSong?.body.tracks.map((song, index) => (
                <>
                  <div className="  ml-10 p-2 grid grid-cols-11 items-center">
                    <div className="text-white flex -ml-2  col-span-4">
                      <img
                        className="h-12 w-12 "
                        src={song.album.images[0].url}
                        alt={song.album.id}
                      />
                      <div className=" text-white ml-2 ">
                        <div>{song.name}</div>
                        <div>{song.artists[0].name}</div>
                      </div>
                    </div>
                    <div className="col-span-5 text-white">
                      {song.album.name}
                    </div>
                    <div className="h-10 w-20 rounded-full border-solid border-2 border-indigo-white text-white flex items-center justify-center">
                      Add
                    </div>
                  </div>
                </>
              ))
            ) : (
              <MyPlaylistSearch />
            )}
          </div>
        </div>
      </div>
    // </div>
  );
}

export default MyPlaylist;
