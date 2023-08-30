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
    console.log
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
      if (window.innerWidth < 900) {
        
         newReleaseAlbums.albums?.items.map((album, index) => {
           index <= 1 && filtedData.push(album);
         });
         setAlbumSize(1);
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
        <h2 className="text-white text-2xl font-bold mt-5 mb-5 ml-5 mdm:text-center  ">
          New Release Albums List
        </h2>
      )}

      <div className="flex  ml-5 w-calc(100vw-256px ) mdm:text-center mdm:justify-center">
        {filteredAlbumList &&
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.name + index}>
              <div className="max-lg">
                <NewRelaseAlbumCard album={album} albumSize={albumSize} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewReleaseAlbumList;
