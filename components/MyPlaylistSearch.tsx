import axios from "axios";
import React, { useState,useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import useSpotify from "../hooks/useSpotify";

type Props = {}

function MyPlaylistSearch({}: Props) {
    const spotifyApi = useSpotify();
    const [search, setSearch] = useState<string |undefined>();
    const [searcheadAlbums, setSearchedAlbums] = useState<any>();
    useEffect(()=>{
        if(search !=="" && search !==undefined){
        spotifyApi
          .search(search, ["track", "playlist"], { limit: 10, offset: 1 })
          .then((res) => {
            // spotifyApi.searchAlbums(search, { limit: 10, offset: 1 }).then((res) => {
            setSearchedAlbums(res);
          });
        }
    },[spotifyApi,search])

    const searchHanlder =(e) =>{
        console.log(e)
        // e === "" ? setSearchedAlbums("")  setSearch(e) : setSearch(e);
        if(e ===""){
            setSearchedAlbums("")
            setSearch("")
        }else{
            setSearch(e)
        }
    }
    console.log(search);
    console.log(searcheadAlbums)
  return (
    <div className="">
      <div className=" w-96 h-12 rounded-lg mt-5 ml-10 bg-slate-600 flex justify-even items-center ">
        <div className="ml-2 scale-150">
          <BsSearch />
        </div>
        <input
          type="text"
          className=" ml-2 focus:outline-none bg-slate-600"
          onChange={(e) => searchHanlder(e.target.value)}
        />
      </div>
      {searcheadAlbums &&
        searcheadAlbums.body.tracks.items.map((song, index) => (
          <>
            <div className=" grid grid-cols-10 items-center">
              <div className="text-white flex ml-5 my-2 col-span-4">
                <div className="mr-5 mt-2">{index + 1}</div>
                <img
                  className="h-12 w-12 "
                  src={song.album.images[0].url}
                  alt={song.album.id}
                />
                <div className=" text-white ml-2 ">
                  <div className="text-white">{song.name}</div>
                  <div>{song.artists[0].name}</div>
                </div>
              </div>
              <div className="col-span-3 text-white">{song.album.name}</div>
              <div>
                <div className="h-10 w-20 rounded-full border-solid border-2 border-indigo-white text-white flex items-center justify-center">
                  Add
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

export default MyPlaylistSearch