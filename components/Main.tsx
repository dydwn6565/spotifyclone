import React, { useState, useRef } from "react";

import Image from "next/image";
import useGetRecentlyPlayedTrack from "../hooks/useGetRecentlyPlayedTrack";
import useGetNewReleaseAlbums from "../hooks/useGetNewReleaseAlbums";

import useRecommendationAlbum from "../hooks/useGetPopularAlbum";
import Head from "./Head";

import { useRecoilState } from "recoil";
import { playlistState, selectedPlaylists } from "../atoms/playlistAtom";

import NewReleaseAlbumList from "./NewReleaseAlbumList";
type Props = {};

function Main({}: Props) {
  const recentlyPlayedList = useGetRecentlyPlayedTrack();
  const newReleaseAlbums: any = useGetNewReleaseAlbums();
  const recommendationAlbum = useRecommendationAlbum();
  const [selectedPlaylist, setSelectedPlaylist] =
    useRecoilState(selectedPlaylists);
  const [albumid, setAlbumid] = useState("");

  const linktoPlaylist = useRef<any | undefined>();

  const linkToPlaylists = (selectedAlbumid) => {
    setAlbumid(selectedAlbumid);
    // spotifyApi
    //   .getAlbum(selectedAlbumid)
    //   .then((res) => {

    //     setSelectedPlaylist(res.body);
    //     console.log(res);
    //   }).then((result)=>{
    window.location.href = `/playlist/${selectedAlbumid}`;
  };
  return (
    <>
      <div className=" bg-zinc-800 h-full w-screen min-w-[800px]">
        <Head color={"zinc"} />
        <div className="p-5">
          <title>Spotify</title>
          <h2 className="text-white text-2xl font-bold">
            Recently Played List
          </h2>
          <div className="flex mt-5 ">
            {recentlyPlayedList &&
              recentlyPlayedList.map((song) => (
                <div key={song.track.album.images[0].url}>
                  <>{/* {console.log(song)} */}</>
                  <div
                    className="w-60 h-auto  items-center flex  flex-col mr-3"
                    onClick={() => linkToPlaylists(song.track.album.id)}
                  >
                    <div className=" h-1/2 w-3/4  mt-5   ">
                      <Image
                        width={"200px"}
                        height={"200px"}
                        src={song.track.album.images[1].url}
                        alt={song.track.album.images[1].url}
                      />
                      <div className="mt-8 mr-auto mb-8 ">
                        {song.track.name.length > 10 ? (
                          <div className="text-white">
                            {song.track.name.slice(0, 10) + "...."}
                          </div>
                        ) : (
                          <div className="text-white">{song.track.name}</div>
                        )}
                        {song.track.artists[0].name.length > 10 ? (
                          <div className="text-white">
                            {song.track.artists[0].name.slice(0, 10) + "...."}
                          </div>
                        ) : (
                          <div className="text-white">
                            {song.track.artists[0].name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* <h2 className="text-white text-2xl font-bold mt-5 mb-5">
            New Release Albums List
          </h2> */}
          <NewReleaseAlbumList newReleaseAlbums={newReleaseAlbums} />
          {/* <div className="flex overflow-hidden hover:overflow-auto">
            {newReleaseAlbums &&
              newReleaseAlbums.albums?.items.map((album) => (
                <div key={album.name}>
                  <div className="w-60 h-auto  items-center flex  flex-col mr-3">
                    <div className=" h-1/2 w-3/4  mt-5   ">
                      <Image
                        width={"200px"}
                        height={"200px"}
                        src={album.images[1].url}
                        alt={album.images[1].url}
                      />
                      <div className="mt-8 mr-auto mb-8 ">
                        {album.name.length > 10 ? (
                          <div className="text-white">
                            {album.name.slice(0, 10) + "...."}
                          </div>
                        ) : (
                          <div className="text-white">{album.name}</div>
                        )}
                        {album.artists[0].name.length > 10 ? (
                          <div className="text-white">
                            {album.artists[0].name.slice(0, 10) + "...."}
                          </div>
                        ) : (
                          <div className="text-white">
                            {album.artists[0].name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div> */}

          <h2 className="text-white text-2xl font-bold mt-5 mb-5">
            recommendationAlbum List
          </h2>
          <div className="flex overflow-hidden hover:overflow-auto">
            {recommendationAlbum &&
              recommendationAlbum.map((album) => (
                <div key={album.name}>
                  <div className="w-60 h-auto  items-center flex  flex-col mr-3">
                    <div className=" h-1/2 w-3/4  mt-5   ">
                      <Image
                        width={"200px"}
                        height={"200px"}
                        src={album.album.images[1].url}
                        alt={album.album.images[1].url}
                      />
                      <div className="mt-8 mr-auto mb-8 ">
                        {album.name.length > 10 ? (
                          <div className="text-white">
                            {album.name.slice(0, 10) + "...."}
                          </div>
                        ) : (
                          <div className="text-white">{album.name}</div>
                        )}
                        {album.artists[0].name.length > 10 ? (
                          <div className="text-white">
                            {album.artists[0].name.slice(0, 10) + "...."}
                          </div>
                        ) : (
                          <div className="text-white">
                            {album.artists[0].name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <Link href={`/playlist/my/${albumid}`}>
        <a ref={linktoPlaylist}></a>
      </Link> */}
    </>
  );
}

export default Main;
