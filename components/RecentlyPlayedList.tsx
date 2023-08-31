import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import RecentlyPlayedListCard from './RecentlyPlayedListCard';
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
type Props = {}

const RecentlyPlayedList = ({ recentlyPlayedList }: any) => {
  const [albumid, setAlbumid] = useState("");
  
  const linkToPlaylists = (selectedAlbumid) => {
    setAlbumid(selectedAlbumid);

    window.location.href = `/playlist/${selectedAlbumid}`;
  };
  const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    let filtedData = [];
    
    if (window.innerWidth >= 2000) {
        
      recentlyPlayedList.map((album, index) => {
        index <= 6 && filtedData.push(album);
      });
      setAlbumSize(6);
    }
    if (window.innerWidth < 2000 && window.innerWidth >= 1880) {
      
      recentlyPlayedList.map((album, index) => {
        index <= 5 && filtedData.push(album);
      });
      setAlbumSize(6);
    }
    if (window.innerWidth < 1880 && window.innerWidth >= 1610) {
      
      recentlyPlayedList.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(5);
    }
    if (window.innerWidth < 1610 && window.innerWidth >= 1350) {
      
      recentlyPlayedList.map((album, index) => {
        index <= 3 && filtedData.push(album);
      });
      setAlbumSize(4);
    }
    if (window.innerWidth < 1350 && window.innerWidth >= 1000) {
      
      recentlyPlayedList.map((album, index) => {
        index <= 2 && filtedData.push(album);
      });
      setAlbumSize(3);
    }
    if (window.innerWidth < 1000) {
      
      recentlyPlayedList.map((album, index) => {
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(2);
    }

    setFilteredAlbumList(filtedData);
  };

  useEffect(() => {
    if (hasWindow && recentlyPlayedList !== undefined) {
      
      window.addEventListener("resize", resizeHanlder);
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [recentlyPlayedList, hasWindow]);
  
  useEffect(() => {
    setFilteredAlbumList([]);
   resizeHanlder()
  }, [recentlyPlayedList]);
  
  return (
    <>
      {filteredAlbumList && <h2 className="text-white text-2xl font-bold mt-5 mb-5 ml-5   mdm:text-center sms:text-[5vw] ">
        Recently Played Albums List
      </h2>}
      <div className="flex  flex-wrap  ml-5 mdm:text-center mdm:justify-center mdm:hidden mdm:ml-0">
        {filteredAlbumList &&
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.track.name + index}>
              <div className="max-lg">
                <RecentlyPlayedListCard album={album} albumSize={albumSize} />
              </div>

            
            </div>
          ))}
      </div>
      <div className="flex  w-calc(100vw-256px)  ml-5 hidden mdm:block mdm:text-center mdm:justify-center mdm:flex mdm:ml-0 ">
        <Splide
              aria-label="My Favorite Images"
              options={{
                rewind: true,
                width: 400,
                perPage: 1,
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
            <SplideSlide key={album?.track.name + index}>
            <div >
              <div className="max-lg">
                <RecentlyPlayedListCard album={album} albumSize={albumSize} />
              </div>
            </div>
            </SplideSlide>
          ))}
          </Splide>
      </div>
    </>
  );
};

export default RecentlyPlayedList