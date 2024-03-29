import { debounce } from "lodash";
import Image from "next/image";
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { BsSearch } from "react-icons/bs";

import useSpotify from "../hooks/useSpotify";

type Props = {
  searcheadAlbums: any;
  setSearchedAlbums: Dispatch<SetStateAction<any | undefined>>;
  pathname: string;
  addSongToPlaylist: (albumid: string) => void;
  search: any;
  setSearch: Dispatch<SetStateAction<any | undefined>>;
};

function MyPlaylistSearch({
  setSearchedAlbums,
  searcheadAlbums,
  addSongToPlaylist,
  search,
  setSearch
}: Props) {
  const spotifyApi = useSpotify();
  

  useEffect(() => {
    if (search !== "" && search !== undefined) {
      
      
      setSearchedAlbums("");
      spotifyApi
        .search(search, ["track", "playlist"], { limit: 10, offset: 1 })
        .then((res) => {
          setSearchedAlbums(res);
        });
    }
  }, [spotifyApi, search]);

  const searchHanlder = (e) => {
    console.log(e);

    if (e === "" || e === " ") {
      setSearchedAlbums("");

      setSearch("");
    } else {
      setSearch(e);
    }
  };

  // const debouncedSearchedAlbum = useCallback(
  //   debounce (() => {
  
  //      spotifyApi
  //        .search(search, ["track", "playlist"], { limit: 10, offset: 1 })
  //        .then((res) => {
  //          setSearchedAlbums(res);
  //        });
  //   }, 500),
  //   []
  // );

  return (
    <div className=" sms:flex sms:justify-center sms:flex-col">
      <div className=" w-96 h-12 rounded-lg mt-5 ml-10 bg-slate-600 flex justify-even items-center sms:w-[65vw] ">
        <div className="ml-2 scale-150">
          <BsSearch />
        </div>
        <input
          type="text"
          className=" ml-2 focus:outline-none bg-slate-600 sms:w-[45vw] sms:ml-0"
          onChange={(e) => searchHanlder(e.target.value)}
        />
      </div>
      {searcheadAlbums?.body?.tracks.items[0] !==undefined ?
        searcheadAlbums.body.tracks.items.map((song, index) => (
          <div key={song.album.id + index}>
            <div className=" grid grid-cols-10 items-center mt-5 xlml:text-[1.5vw]">
              <div className="text-white flex ml-5 my-2 col-span-5 sms:col-span-7">
                <Image
                  width={"48px"}
                  height={"48px"}
                  src={song.album.images[0].url}
                  alt={song.album.id}
                />
                <div className=" text-white ml-2 ">
                  <div className="text-white">{song.name}</div>
                  <div>{song.artists[0].name}</div>
                </div>
              </div>
              <div className="col-span-3 text-white sms:hidden ">{song.album.name}</div>
              <div>
                <div
                  className="h-10 w-20 rounded-full border-solid border-2 border-indigo-white text-white flex items-center justify-center cursor-pointer"
                  onClick={()=>addSongToPlaylist(song.uri)}
                >
                  Add
                </div>
              </div>
            </div>
          </div>
        )):<><div className="h-128 bg-slate-900"></div></>}
    </div>
  );
}

export default MyPlaylistSearch;
