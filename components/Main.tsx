import React, { useState, useRef, useEffect } from "react";

import useGetRecentlyPlayedTrack from "../hooks/useGetRecentlyPlayedTrack";
import useGetNewReleaseAlbums from "../hooks/useGetNewReleaseAlbums";

import useRecommendationAlbum from "../hooks/useGetPopularAlbum";
import Head from "./Head";

import NewReleaseAlbumList from "./NewReleaseAlbumList";

import RecommendationAlbum from "./RecommendationAlbum";
import RecentlyPlayedList from "./RecentlyPlayedList";

import PlayedListComponents from "./PlayedListComponents";
import useGetFeaturedAlbum from "../hooks/useGetFeacturedAlbums";
import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import BottomNav from "./BottomNav";
import MyPlayListList from "./MyPlayListList";

type Props = {};

function Main({}: Props) {
  const recentlyPlayedList = useGetRecentlyPlayedTrack();
  const newReleaseAlbums: any = useGetNewReleaseAlbums();
  const recommendationAlbum = useRecommendationAlbum();
  const useGetFeaturedAlbumList = useGetFeaturedAlbum();
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
      <div className=" bg-zinc-800 min-h-screen h-full w-[calc(100vw-256px)] mdm:w-full ">
        <Head color={"zinc"} />

        <title>Music Land</title>
        <div className="hidden mdm:block">

        <MyPlayListList />  
        </div>
        <RecentlyPlayedList recentlyPlayedList={recentlyPlayedList} />
        <NewReleaseAlbumList newReleaseAlbums={newReleaseAlbums} />
        <RecommendationAlbum recommendationAlbum={recommendationAlbum} />
        <PlayedListComponents items={useGetFeaturedAlbumList} />
        
      </div>
      <div className="hidden mdm:block">
        <BottomNav />
      </div>
    </>
  );
}

export default Main;
