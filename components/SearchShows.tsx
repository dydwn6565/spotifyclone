import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
type Props = { searcheadShow: any };
const SearchShows = ({ searcheadShow }: Props) => {
  const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    let filtedData = [];
    if (window.innerWidth >= 1380) {
      searcheadShow.body.shows.items.map((artist, index) => {
        index <= 3 && filtedData.push(artist);
      });
      setAlbumSize(4);
    }
    if (window.innerWidth < 1380 && window.innerWidth >= 1100) {
      searcheadShow.body.shows.items.map((artist, index) => {
        index <= 2 && filtedData.push(artist);
      });
      setAlbumSize(3);
    }

    if (window.innerWidth < 1100) {
      searcheadShow.body.shows.items.map((artist, index) => {
        index <= 1 && filtedData.push(artist);
      });
      setAlbumSize(2);
    }
    if (window.innerWidth <= 730) {
      searcheadShow.body.shows.items.map((artist, index) => {
        index <= 1 && filtedData.push(artist);
      });
      setAlbumSize(2);
    }

    setFilteredAlbumList(filtedData);
  };
  useEffect(() => {
    if (searcheadShow?.body !== undefined) {
      resizeHanlder();
    }
  }, []);
  useEffect(() => {
    if (hasWindow && searcheadShow?.body !== undefined) {
      window.addEventListener("resize", resizeHanlder);
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [searcheadShow, hasWindow]);

  return (
    <div>
      <>
        {searcheadShow &&
          searcheadShow?.body?.shows?.items[0] !== undefined && (
            <div className="ml-10">
              <div className="text-3xl mt-2 text-white mdm:flex mdm:justify-center ">
                Shows
              </div>
              <div className="flex mdm:justify-center mdm:hidden">
                {filteredAlbumList.map((show) => (
                  <div key={show.id}>
                    <div className="w-48 h-80 bg-black flex rounded-2xl flex-col items-center mr-10 mt-10 ">
                      <div className="mt-10">
                        <Image
                          width={"160px"}
                          height={"160px"}
                          src={
                            show.images[0] !== undefined && show.images[0].url
                          }
                          alt="episode"
                        />
                      </div>
                      {show.name.length > 10 ? (
                        <div className="text-white">
                          {show.name.slice(0, 20) + "..."}
                        </div>
                      ) : (
                        <div className="text-white">{show.name}</div>
                      )}
                      {show.description.length > 10 ? (
                        <div className="text-white">
                          {show.description.slice(0, 20) + "..."}
                        </div>
                      ) : (
                        <div className="text-white">{show.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex mdm:justify-center hidden mdm:block">
                <Splide
                  aria-label="My Favorite Images"
                  options={{
                    rewind: true,
                    width: 500,
                    perPage: 2,
                    type: "loop",
                    padding: "0.1rem",
                  }}
                >
                  {filteredAlbumList.map((show) => (
                    <SplideSlide>
                      <div key={show.id}>
                        <div className="w-48 h-80 bg-black flex rounded-2xl flex-col items-center mr-10 mt-10 ">
                          <div className="mt-10">
                            <Image
                              width={"160px"}
                              height={"160px"}
                              src={
                                show.images[0] !== undefined &&
                                show.images[0].url
                              }
                              alt="episode"
                            />
                          </div>
                          {show.name.length > 10 ? (
                            <div className="text-white">
                              {show.name.slice(0, 20) + "..."}
                            </div>
                          ) : (
                            <div className="text-white">{show.name}</div>
                          )}
                          {show.description.length > 10 ? (
                            <div className="text-white">
                              {show.description.slice(0, 20) + "..."}
                            </div>
                          ) : (
                            <div className="text-white">{show.description}</div>
                          )}
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            </div>
          )}
      </>
    </div>
  );
};

export default SearchShows;
