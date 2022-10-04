import Image from "next/image";
import React, { useEffect, useState } from "react";
import NewRelaseAlbumCard from "./NewRelaseAlbumCard";

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
    if (window.innerWidth >= 1900) {
      
      newReleaseAlbums.albums.items.map((album, index) => {
        index <= 6 && filtedData.push(album);
      });
      setAlbumSize(6);
    }
    if (window.innerWidth < 1900 && window.innerWidth >= 1580) {
    //   console.log(newReleaseAlbums);
      newReleaseAlbums.albums.items.map((album, index) => {
        index <= 5 && filtedData.push(album);
      });
      setAlbumSize(6)
    }
    if (window.innerWidth < 1580 && window.innerWidth >= 1350) {
    //   console.log(newReleaseAlbums);
      newReleaseAlbums.albums.items.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(5);
    }
     if (window.innerWidth < 1350 && window.innerWidth >= 1100) {
    //    console.log(newReleaseAlbums);
       newReleaseAlbums.albums.items.map((album, index) => {
         index <= 3 && filtedData.push(album);
       });
       setAlbumSize(4);
     }
       if (window.innerWidth < 1100 && window.innerWidth >= 1000) {
    //    console.log(newReleaseAlbums);
       newReleaseAlbums.albums.items.map((album, index) => {
         index <= 2 && filtedData.push(album);
       });
       setAlbumSize(3);
     }
       if (window.innerWidth < 1000) {
        //  console.log(newReleaseAlbums);
         newReleaseAlbums.albums.items.map((album, index) => {
           index <= 1 && filtedData.push(album);
         });
         setAlbumSize(2);
       }
    // console.log(filtedData);
    setFilteredAlbumList(filtedData);
   
  };
  useEffect(() => {
    if (hasWindow && newReleaseAlbums.albums !== undefined) {
      window.addEventListener("resize", resizeHanlder);
      
    //   let filtedData = [];
    //   if (window.innerWidth >= 1800) {
        
    //     newReleaseAlbums.albums.items.map((album, index) => {
    //       index <= 6 && filtedData.push(album);
    //     });
    //   }
    //   if (window.innerWidth < 1800 && window.innerWidth >= 1200) {
    //     console.log(newReleaseAlbums);
    //     newReleaseAlbums.albums.items.map((album, index) => {
    //       index <= 5 && filtedData.push(album);
    //     });
    //   }
    //   if (window.innerWidth < 1200 && window.innerWidth >= 800) {
    //     console.log(newReleaseAlbums);
    //     newReleaseAlbums.albums.items.map((album, index) => {
    //       index <= 4 && filtedData.push(album);
    //     });
    //   }
    //   console.log(filtedData);
    //   setFilteredAlbumList(filtedData);
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [newReleaseAlbums, hasWindow]);
  return (
    <div>
      {/* <>{console.log(filteredAlbumList)}</> */}
      <h2 className="text-white text-2xl font-bold mt-5 mb-5">
        New Release Albums List
      </h2>
      <div className="flex  flex-wrap w-full min-w-[800px] ">
        {filteredAlbumList &&
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.name + index}>
              <div className="max-lg">
                <NewRelaseAlbumCard album={album} albumSize={albumSize} />
              </div>

              {/* {hasWindow &&
                window.innerWidth < 900 &&
                window.innerWidth >= 700 &&
                index <= 5 && <NewRelaseAlbumCard album={album} />} */}
              {/* {hasWindow && window.innerWidth > 700 && window.innerWidth <= 500
                && index <= 4 && <NewRelaseAlbumCard album={album} />}
                {hasWindow && window.innerWidth > 500 &&
                 index <= 3 && <NewRelaseAlbumCard album={album} />} */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewReleaseAlbumList;
