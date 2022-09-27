import React, { useEffect, useState } from "react";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import spotifyApi from "../lib/spotify";
import useSpotify from "../hooks/useSpotify";
import shuffle from "lodash";
import Image from "next/image";
import useGetRecentlyPlayedTrack from "../hooks/useGetRecentlyPlayedTrack";
import useGetNewReleaseAlbums from "../hooks/useGetNewReleaseAlbums";
import useGetPopularAlbum from "../hooks/useGetPopularAlbum";
import useRecommendationAlbum from "../hooks/useGetPopularAlbum";
type Props = {};

function Main({}: Props) {
  const spotifyApi = useSpotify();
  // const playlistid = useRecoilValue(playlistIdState);
  // const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [color, setColor] = useState(null);
  // const [recentlyPlayedList, setRecentlyPlayedList] = useState(null);
  const recentlyPlayedList = useGetRecentlyPlayedTrack();
  const newReleaseAlbums = useGetNewReleaseAlbums();
  const recommendationAlbum = useRecommendationAlbum();
  // console.log(playlist);
  // console.log(playlistid);

  // useEffect(()=>{
  //   setColor(shuffle(colors).pop());
  // },[playlistid])

  // useEffect(() => {
  //   spotifyApi
  //     .getPlaylist(playlistid)
  //     .then((data) => {
  //       setPlaylist(data.body);
  //       // console.log(data.body.tracks.items)
  //     })
  //     .catch((err) => console.log("Something went wrong!", err));
  // }, [spotifyApi, playlistid])

  // useEffect(() => {
  //   if (spotifyApi.getCredentials().accessToken) {
  //     spotifyApi
  //       .getMyRecentlyPlayedTracks()
  //       .then((data) => {
  //         deleteDuplicatedImage(data.body.items);
  //       })
  //       .catch((err) => console.log("Something went wrong!", err));
  //   }
  // }, [spotifyApi]);

  // useEffect(() => {

  //   if (spotifyApi.getCredentials().accessToken) {

  //     spotifyApi
  //       .getNewReleases()
  //       .then((data) => {
  //         fetch(data.body.albums.href,{
  //           method:"GET",
  //           headers:{"Authorization" : `Bearer ${spotifyApi.getCredentials().accessToken}`,}
  //         }).then((re)=>{
  //           return re.json()
  //             console.log(re.json)
  //         }).then((result)=>{
  //           console.log(result);
  //         });
  //         // console.log(data.body.albums.href)
  //       })
  //       .catch((err) => console.log("Something went wrong!", err));
  //   }
  // }, [spotifyApi]);


  // useEffect(() => { 
  //   if (spotifyApi.getCredentials().accessToken) {
  //     spotifyApi
  //       .getCategories()
  //       .then((data) => {
  //         console.log(data)
  //       })
  //       .catch((err) => console.log("Something went wrong!", err));
  //   }
  // }, [spotifyApi]);

  // useEffect(() => {
  //   if (spotifyApi.getCredentials().accessToken) {
  //     spotifyApi
  //       .getNewReleases()
  //       .then((data) => {
  //         console.log(data)
  //       })
  //       .catch((err) => console.log("Something went wrong!", err));
  //   }
  // }, [spotifyApi]);

  
  // const deleteDuplicatedImage = (albums: Array<any>) => {
  //   const newAlbumName = [];
  //   const newAlbum = [];
  //   albums.map((album) => {
  //     if (!newAlbumName.includes(album.track.album.name)) {
  //       newAlbumName.push(album.track.album.name);
  //       newAlbum.push(album);
  //     }
  //   });
  //   setRecentlyPlayedList(newAlbum);
  // };

  return (
    <div className="p-5 bg-zinc-800 h-full">
      <title>Spotify</title>
      <h2 className="text-white text-2xl font-bold">Recently Played List</h2>
      <div className="flex mt-5 ">
        {/* <>{console.log(recentlyPlayedList)}</>   */}
        {/* <>{console.log(newReleaseAlbums)}</> */}
        <>{console.log(recommendationAlbum)}</>
        {recentlyPlayedList &&
          recentlyPlayedList.map((song) => (
            <div key={song.track.album.images[0].url}>
              {/* {console.log(song)} */}
              <div className="w-60 h-auto border-2 items-center flex  flex-col mr-3">
                <div className=" h-1/2 w-3/4  mt-5   ">
                  <img
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
      <h2 className="text-white text-2xl font-bold mt-5 mb-5">
        New Release Albums List
      </h2>
      <div className="flex overflow-hidden hover:overflow-auto">
        {newReleaseAlbums &&
          newReleaseAlbums.albums?.items.map((album) => (
            <div key={album.name}>
              <div className="w-60 h-auto border-2 items-center flex  flex-col mr-3">
                <div className=" h-1/2 w-3/4  mt-5   ">
                  <img src={album.images[1].url} alt={album.images[1].url} />
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
                      <div className="text-white">{album.artists[0].name}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <h2 className="text-white text-2xl font-bold mt-5 mb-5">
        recommendationAlbum  List
      </h2>
      <div className="flex overflow-hidden hover:overflow-auto">
        {recommendationAlbum &&
          recommendationAlbum.map((album) => (
            <div key={album.name}>
              <div className="w-60 h-auto border-2 items-center flex  flex-col mr-3">
                <div className=" h-1/2 w-3/4  mt-5   ">
                  <img
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
                      <div className="text-white">{album.artists[0].name}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Main;
