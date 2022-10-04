import React, { useState, useRef, useEffect } from "react";


import useGetRecentlyPlayedTrack from "../hooks/useGetRecentlyPlayedTrack";
import useGetNewReleaseAlbums from "../hooks/useGetNewReleaseAlbums";

import useRecommendationAlbum from "../hooks/useGetPopularAlbum";
import Head from "./Head";


import NewReleaseAlbumList from "./NewReleaseAlbumList";

import RecommendationAlbum from "./RecommendationAlbum";
import RecentlyPlayedList from "./RecentlyPlayedList";
type Props = {};

function Main({}: Props) {
  const recentlyPlayedList = useGetRecentlyPlayedTrack();
  const newReleaseAlbums: any = useGetNewReleaseAlbums();
  const recommendationAlbum = useRecommendationAlbum();
  
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
      <div className=" bg-zinc-800 h-full  min-w-[800px] w-[calc(100vw-17.2rem)]">
        <Head color={"zinc"} />
        <div className="p-5">
          <title>Spotify</title>

          <RecentlyPlayedList recentlyPlayedList={recentlyPlayedList} />

          <NewReleaseAlbumList newReleaseAlbums={newReleaseAlbums} />

          <RecommendationAlbum recommendationAlbum={recommendationAlbum} />
        </div>
      </div>
    </>
  );
}

export default Main;
