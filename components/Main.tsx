import React, { useState, useRef } from "react";

import Image from "next/image";
import useGetRecentlyPlayedTrack from "../hooks/useGetRecentlyPlayedTrack";
import useGetNewReleaseAlbums from "../hooks/useGetNewReleaseAlbums";

import useRecommendationAlbum from "../hooks/useGetPopularAlbum";
import Head from "./Head";

import { useRecoilState } from "recoil";
import { playlistState, selectedPlaylists } from "../atoms/playlistAtom";

import NewReleaseAlbumList from "./NewReleaseAlbumList";
import RecommendationAlubm from "./RecommendationAlbum";
import RecommendationAlbum from "./RecommendationAlbum";
import RecentlyPlayedList from "./RecentlyPlayedList";
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
          <RecentlyPlayedList recentlyPlayedList={recentlyPlayedList} />
         
     
          <NewReleaseAlbumList newReleaseAlbums={newReleaseAlbums} />
         
          <RecommendationAlbum recommendationAlbum={recommendationAlbum} />
          
        </div>
      </div>
      {/* <Link href={`/playlist/my/${albumid}`}>
        <a ref={linktoPlaylist}></a>
      </Link> */}
    </>
  );
}

export default Main;
