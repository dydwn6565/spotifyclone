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
    
    //   }).then((result)=>{
    window.location.href = `/playlist/${selectedAlbumid}`;
  };
   
  return (
    <>
      <div className=" bg-zinc-800 min-h-screen  min-w-screen w-[calc(100vw-273px)] ">
        <Head color={"zinc"} />
        <div className="p-5">
          <title>Music Land</title>

          <RecentlyPlayedList recentlyPlayedList={recentlyPlayedList} />

          <NewReleaseAlbumList newReleaseAlbums={newReleaseAlbums} />

          <RecommendationAlbum recommendationAlbum={recommendationAlbum} />
        </div>
      </div>
    </>
  );
}

export default Main;
