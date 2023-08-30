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
            <div className="ml-10 mdm:ml-0">
              <div className="text-3xl my-5 text-white mdm:flex mdm:justify-center sms:text-[5vw]">
                Shows
              </div>
              <div className="flex mdm:justify-center mdm:hidden">
                {filteredAlbumList.map((show) => (
                  <div key={show.id}>
                    <div className="w-48 h-80 bg-black flex rounded-2xl flex-col items-center mr-10 mt-10 ">
                      <div className="mt-10 min-w-[150px] min-h-[150px]">
                        <Image
                          width={"160px"}
                          height={"160px"}
                          src={
                            show.images[0] !== undefined && show.images[0].url
                          }
                          alt="episode"
                          layout="responsive"
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

              <div className="mdm:flex mdm:justify-center hidden mdm:block">
                <Splide
                  aria-label="My Favorite Images"
                  options={{
                    rewind: true,
                    width: 500,
                    perPage: 2,
                    type: "loop",
                    padding: "0.1rem",
                    breakpoints: {
                      535: {
                        width: 360,
                        padding: "0.1rem",
                      },
                      350: {
                        width: 300,
                        padding: "0.1rem",
                      },
                    },
                  }}
                >
                  {filteredAlbumList.map((show) => (
                    <SplideSlide>
                      <div key={show.id}>
                        <div className="w-48 h-80 bg-black flex rounded-2xl flex-col items-center mr-10 mt-10 sms:w-[125px] sms:h-48 smxs:w-[95px] smxs:h-36 sms:mt-0">
                          <div className="mt-10 mdm:w-[120px] mdm:h-[120px] sms:w-[17vw] sms:h-[17vw] sms:-mt-[-14px]">
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
                          <div className="sms:my-3 sms:ml-2">

                          {show.name.length > 10 ? (
                            <div className="text-white sms:text-[13px] smxs:text-[10px]">
                              {show.name.slice(0, 20) + "..."}
                            </div>
                          ) : (
                            <div className="text-white sms:text-[13px] smxs:text-[10px]">{show.name}</div>
                          )}
                          {show.description.length > 10 ? (
                            <div className="text-white text-sm sms:text-[12px] smxs:text-[8px]">
                              {show.description.slice(0, 20) + "..."}
                            </div>
                          ) : (
                            <div className="text-white text-sm sms:text-[12px] smxs:text-[8px]">{show.description}</div>
                          )}
                          </div>
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
