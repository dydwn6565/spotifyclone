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
  const [searcheadArtists, setSearchedArtists] = useState<any>();
  const [searcheadEpisodes, setSearchedEpisodes] = useState<
    any
  >();
  const [searcheadShow, setSearchedShow] = useState<any>();
  

  useEffect(() => {
    
    if (search !== undefined && search !== "") {
      
      spotifyApi.searchAlbums(search, { limit: 4, offset: 1 }).then((res) => {
        setSearchedAlbums(res);
      });
      spotifyApi.searchArtists(search, { limit: 4, offset: 1 }).then((res) => {
        
        setSearchedArtists(res);
      });
      spotifyApi.searchEpisodes(search, { limit: 4, offset: 1 }).then((res) => {
        setSearchedEpisodes(res);
      });
      spotifyApi.searchShows(search, { limit: 4, offset: 1 }).then((res) => {
        
        setSearchedShow(res);
      });
      
    }
  }, [spotifyApi, search]);
  console.log( search !== undefined &&
          search !== "" &&
          searcheadAlbums?.body?.albums?.items[0] !== undefined);
   const searchHanlder = (e) => {
    //  console.log(e);
     
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
      <div
        className={
          search !== undefined &&
          search !== "" &&
          searcheadAlbums?.body?.albums?.items[0] !== undefined &&
          searcheadArtists?.body?.artists?.items[0] !== undefined &&
          searcheadEpisodes?.body?.episodes?.items[0] !== undefined &&
          searcheadAlbums?.body?.albums?.items[0] !== undefined
            ? "flex bg-zinc-900 h-full  mdm:justify-center"
            : 
            
              "flex bg-zinc-900 h-screen "
        }
      >
        <div className="mdm:hidden">
          <Sidebar />
        </div>

        <div className="bg-zinc-900">
          <SearchHeader searchHanlder={searchHanlder} color={"zinc-900"} />
          {search !== undefined &&
            search !== "" &&
            searcheadAlbums?.body?.albums.items[0] !== undefined && (
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
