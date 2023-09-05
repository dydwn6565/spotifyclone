import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
type Props = { searcheadArtists: any };
const SearchArtists = ({ searcheadArtists }: Props) => {
  const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    let filtedData = [];
    if (window.innerWidth >= 1380) {
      searcheadArtists.body.artists.items.map((artist, index) => {
        index <= 3 && filtedData.push(artist);
      });
      setAlbumSize(4);
    }
    if (window.innerWidth < 1380 && window.innerWidth >= 1100) {
      searcheadArtists.body.artists.items.map((artist, index) => {
        index <= 2 && filtedData.push(artist);
      });
      setAlbumSize(3);
    }

    if (window.innerWidth < 1100 && window.innerWidth >= 730) {
      searcheadArtists.body.artists.items.map((artist, index) => {
        index <= 1 && filtedData.push(artist);
      });
      setAlbumSize(2);
    }
    if (window.innerWidth <= 730) {
      searcheadArtists.body.artists.items.map((artist, index) => {
        index <= 5 && filtedData.push(artist);
      });
      setAlbumSize(5);
    }

    setFilteredAlbumList(filtedData);
  };

  useEffect(() => {
    if (searcheadArtists?.body !== undefined) {
      resizeHanlder();
    }
  }, [searcheadArtists]);
  useEffect(() => {
    if (hasWindow && searcheadArtists?.body !== undefined) {
      window.addEventListener("resize", resizeHanlder);
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [searcheadArtists, hasWindow]);

   

  return (
    <>
      {filteredAlbumList && filteredAlbumList !== undefined && (
        <div className="ml-10 mt-10 mdm:ml-0">
          <div className="text-3xl my-5  text-white mdm:flex mdm:justify-center sms:text-[5vw]">
            Artists
          </div>
          <div className="flex mdm:justify-center mdm:hidden">
            {filteredAlbumList &&
              filteredAlbumList.map((artist) => (
                <div key={artist?.id}>
                  <div className="w-48 h-80 bg-black rounded-2xl flex mr-10  flex-col items-center ">
                    <div className="rounded-full mt-10 ">
                      <div className="min-w-[150px] min-h-[150px]">
                        <Image
                          width={"160px"}
                          height={"160px"}
                          src={
                            artist.images[0] !== undefined &&
                            artist?.images[0].url
                          }
                          alt="artist image"
                          layout="responsive"
                          // className="rounded-full mt-10"
                        />
                      </div>
                    </div>
                    <div className="mr-12 my-5">
                      <div className="text-white">{artist.name}</div>
                      <div className="text-white">{artist.type}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="hidden mdm:block mdm:flex mdm:justify-center">
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
                    width:360,
                    padding:"0.1rem"
                  },
                  350:{
                    width:300,
                    padding:"0.1rem"
                  }
                },
              }}
            >
              {filteredAlbumList &&
                filteredAlbumList.map((artist) => (
                  <SplideSlide key={artist?.id}>
                    <div >
                      <div className="w-48 h-80 bg-black rounded-2xl flex mr-10 flex-col items-center sms:w-[125px] sms:h-48 smxs:w-[95px] smxs:h-36">
                        <div className="rounded-full mt-10">
                          <div className="mdm:w-[120px] mdm:h-[120px] sms:w-[17vw] sms:h-[17vw] sms:-mt-5">
                            <Image
                              width={"160px"}
                              height={"160px"}
                              src={
                                artist.images[0] !== undefined &&
                                artist?.images[0].url
                              }
                              alt="artist image"
                              layout="responsive"
                              // className="rounded-full mt-10"
                            />
                          </div>
                        </div>
                        <div className="mr-12 my-5 sms:flex sms:flex-col sms:items-center sms:justify-center sms:mr-0 smxs:text-[12px]">
                          <div className="text-white  ">{artist.name}</div>
                          <div className="text-white  ">{artist.type}</div>
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
  );
};

export default SearchArtists;
