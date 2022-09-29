import React, { useEffect, useState } from "react";

import SearchHeader from "../components/SearchHeader";
import Sidebar from "../components/Sidebar";
import SearchTopResult from "../components/SearchTopResult";
import useSpotify from "../hooks/useSpotify";
import SearchArtists from "../components/SearchArtists";
import SearchEposides from "../components/SearchEposides";
import SearchShows from "../components/SearchShows";

export default function Search() {
  const spotifyApi = useSpotify();
  const [search, setSearch] = useState<string | undefined>();
  const [searcheadAlbums, setSearchedAlbums] = useState<any>();
  const [searcheadArtists, setSearchedArtists] = useState<Object | undefined>();
  const [searcheadEpisodes, setSearchedEpisodes] = useState<
    Object | undefined
  >();
  const [searcheadShow, setSearchedShow] = useState<Object | undefined>();
  const [searcheadPopular, setSearchedPopular] = useState<Object | undefined>();

  useEffect(() => {
    console.log(search);
    if (search !== undefined && search !== "") {
      
      spotifyApi.searchAlbums(search, { limit: 4, offset: 1 }).then((res) => {
        setSearchedAlbums(res);
      });
      spotifyApi.searchArtists(search, { limit: 4, offset: 1 }).then((res) => {
        // console.log(res);
        setSearchedArtists(res);
      });
      spotifyApi.searchEpisodes(search, { limit: 4, offset: 1 }).then((res) => {
        setSearchedEpisodes(res);
      });
      spotifyApi.searchShows(search, { limit: 4, offset: 1 }).then((res) => {
        // console.log(res);
        setSearchedShow(res);
      });
      
    }
  }, [spotifyApi, search]);
   const searchHanlder = (e) => {
     console.log(e);
     
     if (e === "") {
       setSearchedAlbums("");
       setSearchedArtists("");
       setSearchedEpisodes("");
       setSearchedShow("");
       setSearch("");
     } else {
       setSearch(e);
     }
   };
  return (
    <>
      <div className={search !== undefined && search !== ""? "grid  grid-cols-6 bg-zinc-900 h-full":"grid  grid-cols-6 bg-zinc-900 h-screen"}>
        <Sidebar />

        <div className="col-span-5">
          <SearchHeader searchHanlder={searchHanlder} />
          {search !== undefined && search !== "" &&searcheadAlbums?.body?.albums.items[0] !== undefined &&(
            <>
              <SearchTopResult searcheadAlbums={searcheadAlbums} />
              <SearchArtists searcheadArtists={searcheadArtists} />
              <SearchEposides searcheadEpisodes={searcheadEpisodes} />
              <SearchShows searcheadShow={searcheadShow} />
            </>
           )} 
        </div>
      </div>
    </>
  );
}
