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
  addSongToPlaylist: (albumid : string) =>void
}

function MyPlaylistSearch({
  setSearchedAlbums,
  searcheadAlbums,
  addSongToPlaylist,
}: Props) {
  const spotifyApi = useSpotify();
  const [search, setSearch] = useState<string | undefined>();

  useEffect(() => {
    if (search !== "" && search !== undefined) {
      // debouncedSearchedAlbum();
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
  //     console.log(search)
  //      spotifyApi
  //        .search(search, ["track", "playlist"], { limit: 10, offset: 1 })
  //        .then((res) => {
  //          setSearchedAlbums(res);
  //        });
  //   }, 500),
  //   []
  // );

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
          <div key={song.album.id + index}>
            <div className=" grid grid-cols-10 items-center mt-5">
              <div className="text-white flex ml-5 my-2 col-span-4">
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
              <div className="col-span-3 text-white">{song.album.name}</div>
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
        ))}
    </div>
  );
}

export default MyPlaylistSearch;
