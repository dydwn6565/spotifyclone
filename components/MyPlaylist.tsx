import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  currentTrackIdState,
  isPlayingState,
  playlistState,
  selectedPlaylists,
} from "../atoms/playlistAtom";
import { shuffle } from "lodash";

import { AiOutlineClockCircle } from "react-icons/ai";

import { BsMusicNoteBeamed } from "react-icons/bs";

import { millisToMinutesAndSeconds } from "../lib/millisToMinutesAndSeconds";
import MyPlaylistSearch from "./MyPlaylistSearch";
import Image from "next/image";
import Head from "./Head";

type Props = {};

const colorList = ["blue", "green", "pink"];

function MyPlaylist({}: Props) {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const pathname = router.asPath.split("/")[3];

  const [playlists, setPlaylists] = useRecoilState(playlistState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [color, setColor] = useState<string | undefined>("blue");
  // const [selectedPlaylist, setSelectedPlaylist] =
  //   useState<any>();
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();
  const [track, setTrack] = useState<any>();
  const [recommendedSong, setRecommendedSong] = useState<any>();
  const [searcheadAlbums, setSearchedAlbums] = useState<any>();
  const [addedSongToPlaylist, setAddedSongToPlaylist] = useState<string>();
  const [search, setSearch] = useState<string | undefined>();
  const num = 4;
  
  //  useEffect(() => {
  //     // setSelectedPlaylist("");
  //     // setTrack("");
  //     // setRecommendedSong("");
  //     // setSearchedAlbums("");
  
      
  //  }, []);
  useEffect(() => {
    
    const filterdPlayList = playlists?.filter((album) => {
      return album.id === pathname;
    });

    setSelectedPlaylist(filterdPlayList);
  }, [pathname, playlists]);

  useEffect(() => {
    setColor(shuffle(colorList).pop());
  }, [pathname, playlists]);

  
  useEffect(() => {
    
    if (selectedPlaylist && selectedPlaylist[0]?.images[0] !== undefined &&pathname) {
      
      axios
        .get(
          `https://api.spotify.com/v1/playlists/${pathname}/tracks?offset=0&limit=100&locale=ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7`,
          {
            headers: {
              Authorization: `Bearer ${
                spotifyApi.getCredentials().accessToken
              }`,
            },
          }
        )
        .then((res) => {
          setTrack(res);
          
          let albumIdList = [];
          res.data.items.map(
            (album, index) =>
              index == 0 && albumIdList.push(album.track.artists[0].id)
          );

          spotifyApi
            .getRecommendations({
              min_energy: 0.4,
              seed_artists: albumIdList,
              min_popularity: 82,
              limit: 10,
            })
            .then((result) => {
              setRecommendedSong(result);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedPlaylist, pathname, spotifyApi, addedSongToPlaylist]);


  const subtractDate = (addedDate: string) => {
    const daysBetween = new Date().getDate() - new Date(addedDate).getDate(); ;
    return daysBetween;
  };

  const playSong = (index: number) => {
    const songInfo = track.data.items[index];
    setCurrentTrackId(songInfo.track.id);
    setIsPlaying(true);
    // spotifyApi.play({uris:[songInfo.track.uri]})
  };

  const addSongToPlaylist = (albumid: string) => {
    spotifyApi
      .addTracksToPlaylist(pathname, [albumid])
      .then((res) => {
        
        setAddedSongToPlaylist(albumid);
        alert("Song is added")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  return (
    <>
      <div
      
      className={ selectedPlaylist && selectedPlaylist[0]?.images[0] !== undefined &&
        recommendedSong?.body?.tracks.length > num.toFixed(1)
         ? "w-[calc(100vw-273px)] h-full bg-gradient-to-b from-blue-500 to-black mdl:w-[97.9vw] mdm:w-[97.8vw]" :
        //  "h-[calc(1200px+100px)] bg-slate-900 w-[calc(100vw-273px)]"}
         "min-h-screen bg-slate-900  w-[calc(100vw-273px)] mdl:w-[97.9vw] mdm:w-[97.8vw] "}
    //  min-h-screen  min-w-screen w-[calc(100vw-273px)] lgm:w-full
      >
        <div>
          <Head color={"slate"} />
          <div className="flex sms:inline ">
            {selectedPlaylist &&
            selectedPlaylist[0]?.images[0] === undefined ? (
              <div className="h-72 w-72 bg-slate-700 ml-7 flex items-center justify-center mt-5 xls:hidden">
                <div className="text-7xl  ">
                  <BsMusicNoteBeamed />
                </div>
              </div>
            ) : (
              <div className="ml-7 mt-5 xls:hidden">
                <Image
                  width={"288px"}
                  height={"288px"}
                  src={selectedPlaylist && selectedPlaylist[0].images[0].url}
                  alt={selectedPlaylist && selectedPlaylist[0].name}
                />
              </div>
            )}

            <div className="sms:flex sms:justify-center sms:items-center">
              <div className="text-white ml-5 mt-10 xls:hidden">
                {selectedPlaylist && selectedPlaylist[0]?.type}
              </div>
              <div className="text-white text-8xl ml-3 mt-5 lgm:text-5xl 2xlm:text-7xl xls:text-[9vw] sms:text-[7vw] ">
                {selectedPlaylist && selectedPlaylist[0]?.name}
              </div>

              <div className="flex space-x-1 mt-20 ml-5 xls:hidden">
                <div className="text-white">
                  {selectedPlaylist && selectedPlaylist[0]?.owner.display_name}
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

          {selectedPlaylist && selectedPlaylist[0]?.images[0] !== undefined && (
            <div className="grid grid-cols-12 mt-10 text-white mb-5 mdl:text-[2vw]">
              <div className="col-span-5 ml-10 xls:col-span-5 " ># Title</div>
              <div className="col-span-3 xls:col-span-2">Album</div>
              <div className="col-span-2 ml-12 xls:col-span-2 xls:ml-0 ">Added Date</div>
              <div className="col-span-1 ml-24 mdl:text-[2vw] smm:ml-[15vw]">
                <AiOutlineClockCircle />
              </div>
            </div>
          )}
          <hr className="ml-10 mr-10 bg-transparent my-5" />
          <div>
            {selectedPlaylist &&
              selectedPlaylist[0]?.images[0] !== undefined &&
              track?.data?.items.map((song, index) => (
                <div key={song.track.id + index}>
                  <div
                    className="  ml-10 p-2 grid grid-cols-12 items-center "
                    onClick={() => playSong(index)}
                  >
                    <div className="text-white flex -ml-2  col-span-4 xls:col-span-4 mdl:text-[2vw]">
                      <div className="mr-5 mt-2">{index + 1}</div>
                      <Image
                        width={"48px"}
                        height={"48px"}
                        src={song.track.album.images[0].url}
                        alt={song.track.album.id}
                      />
                      <div className=" text-white ml-2 ">
                        <div>{song.track.name}</div>
                        <div>{song.track.artists[0].name}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-white ml-20 xls:col-span-3 xls:ml-4 mdl:text-[2vw]">
                      {song.track.album.name}
                    </div>

                    <div className="col-span-2 text-white ml-10 xls:col-span-3 xls:-ml-4 mdl:text-[2vw]">
                      {subtractDate(song.added_at)} days ago
                      
                    </div>
                    <div className="text-white ml-20 xls:ml-8 mdl:text-[2vw] smm:ml-[4vw]">
                      {millisToMinutesAndSeconds(song.track.duration_ms)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {selectedPlaylist && selectedPlaylist[0]?.images[0] === undefined ? (
            <div className="text-2xl ml-10 mt-5 text-white sms:text-[3vw] sms:flex sms:justify-center sms:ml-0">
              Find your song to add into your Playlist
            </div>
          ) : (
            <>
              <div className="text-2xl ml-10 text-white my-5 sms:text-[3vw] sms:my-3">Recommend</div>
              <div className="text-lg ml-10 text-white mb-3 sms:text-[2.5vw]">
                Based on Song in this Playlist
              </div>
            </>
          )}
          <div>
            {selectedPlaylist &&
            selectedPlaylist[0]?.images[0] !== undefined ? (
              recommendedSong?.body?.tracks.map((song, index) => (
                <div key={song.album.id + index}>
                  <div className="  ml-10 p-2 grid grid-cols-11 items-center xls:text-[1.3vw] mdl:text-[2vw] smm:text-[1.7vw]">
                    <div className="text-white flex -ml-2  col-span-5">
                      <Image
                        width={"48px"}
                        height={"48px"}
                        className="h-12 w-12 "
                        src={song.album.images[0].url}
                        alt={song.album.id}
                      />
                      <div className=" text-white ml-2 sms:mt-[2.5vw]">
                        <div>{song.name}</div>
                        <div>{song.artists[0].name}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-white">
                      {song.album.name}
                    </div>
                    <div
                      className="h-10 w-20 rounded-full border-solid border-2 border-indigo-white text-white flex items-center justify-center cursor-pointer sms:w-12 smxs:hidden"
                      onClick={() => addSongToPlaylist(song.uri)}
                    >
                      Add
                    </div>
                     <div
                      className=" hidden   cursor-pointer sms:w-12 smxs:block smxs:text-white "
                      onClick={() => addSongToPlaylist(song.uri)}
                    >
                      Add
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <MyPlaylistSearch
                search={search}
                setSearch={setSearch}
                searcheadAlbums={searcheadAlbums}
                setSearchedAlbums={setSearchedAlbums}
                pathname={pathname}
                addSongToPlaylist={addSongToPlaylist}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPlaylist;
