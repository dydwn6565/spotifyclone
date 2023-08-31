import Image from "next/image";
import React, { useEffect, useState } from "react";
import NewRelaseAlbumCard from "./NewRelaseAlbumCard";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
interface Size {
  width: number;
  height: number;
}

const NewReleaseAlbumList = ( {newReleaseAlbums} : any) => {
  const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    
    let filtedData = [];
    if (window.innerWidth >= 2000) {
      
      newReleaseAlbums.albums?.items.map((album, index) => {
        index <= 7 && filtedData.push(album);
      });
      setAlbumSize(7);
    }
    if (window.innerWidth < 2000 && window.innerWidth >= 1880) {
    
      newReleaseAlbums.albums?.items.map((album, index) => {
        index <= 6 && filtedData.push(album);
      });
      setAlbumSize(6)
    }
    if (window.innerWidth < 1880 && window.innerWidth >= 1622) {
    
      newReleaseAlbums.albums?.items.map((album, index) => {
        index <= 5 && filtedData.push(album);
      });
      setAlbumSize(5);
    }
     if (window.innerWidth < 1622 && window.innerWidth >= 1403) {
    
       newReleaseAlbums.albums?.items.map((album, index) => {
         index <= 4 && filtedData.push(album);
       });
       setAlbumSize(4);
     }
       if (window.innerWidth < 1403 && window.innerWidth >= 1186) {
    
       newReleaseAlbums.albums?.items.map((album, index) => {
         index <= 3 && filtedData.push(album);
       });
       setAlbumSize(3);
     }
       if (window.innerWidth < 1186 && window.innerWidth >= 950) {
    
       newReleaseAlbums.albums?.items.map((album, index) => {
         index <= 2 && filtedData.push(album);
       });
       setAlbumSize(2);
     }
       if (window.innerWidth < 950 && window.innerWidth >= 900) {
        
         newReleaseAlbums.albums?.items.map((album, index) => {
           index <= 1 && filtedData.push(album);
         });
         setAlbumSize(1);
       }
      if (window.innerWidth < 900 && window.innerWidth >= 730) {
        
         newReleaseAlbums.albums?.items.map((album, index) => {
           index <= 1 && filtedData.push(album);
         });
         setAlbumSize(1);
       }
       if (window.innerWidth < 730 ) {
        
         newReleaseAlbums.albums?.items.map((album, index) => {
           index <= 20 && filtedData.push(album);
         });
         setAlbumSize(20);
       }
    setFilteredAlbumList(filtedData);
   
  };
  useEffect(() => {
    if (hasWindow && newReleaseAlbums.albums !== undefined) {
      window.addEventListener("resize", resizeHanlder);
      
   
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [newReleaseAlbums, hasWindow]);
    useEffect(() => {
      setFilteredAlbumList([]);
    resizeHanlder()
    }, [newReleaseAlbums]);
  return (
    <div>
      
      {newReleaseAlbums && (
        <h2 className="text-white text-2xl font-bold mt-5 mb-5 ml-5 mdm:text-center sms:text-[5vw] ">
          New Release Albums List
        </h2>
      )}

      <div className="flex  ml-5 w-calc(100vw-256px ) mdm:text-center mdm:justify-center mdm:hidden">
        {filteredAlbumList &&
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.name + index}>
              <div className="max-lg">
                <NewRelaseAlbumCard album={album} albumSize={albumSize} />
              </div>
            </div>
          ))}
      </div>
      
       <div className="flex  ml-5 w-calc(100vw-256px ) hidden mdm:block mdm:text-center mdm:flex mdm:justify-center mdm:ml-0">
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
          filteredAlbumList.map((album: any, index: number) => (
            <SplideSlide>
            <div key={album?.name + index}>
              <div className="max-lg">
                <NewRelaseAlbumCard album={album} albumSize={albumSize} />
              </div>
            </div>
            </SplideSlide>
          ))}
          </Splide>
      </div>
      
    </div>
  );
};

export default NewReleaseAlbumList;
