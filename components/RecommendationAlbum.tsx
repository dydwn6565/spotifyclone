import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import RecommendationAlbumCard from './RecommendationAlbumCard';
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";


const RecommendationAlbum = ({ recommendationAlbum }: any) => {
  const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    let filtedData = [];
    if (window.innerWidth >= 2000) {
      recommendationAlbum.map((album, index) => {
        index <= 7 && filtedData.push(album);
      });
      setAlbumSize(7);
    }
    if (window.innerWidth < 2000 && window.innerWidth >= 1880) {
      
      recommendationAlbum.map((album, index) => {
        index <= 6 && filtedData.push(album);
      });
      setAlbumSize(6);
    }
    if (window.innerWidth < 1880 && window.innerWidth >= 1622) {
      
      recommendationAlbum.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(5);
    }
    if (window.innerWidth < 1622 && window.innerWidth >= 1403) {
      
      recommendationAlbum.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(4);
    }
     if (window.innerWidth < 1403 && window.innerWidth >= 1186) {
    
       recommendationAlbum.map((album, index) => {
         index <= 3 && filtedData.push(album);
       });
       setAlbumSize(3);
     }
    if (window.innerWidth < 1186 && window.innerWidth >= 950) {
      
      recommendationAlbum.map((album, index) => {
        index <= 2 && filtedData.push(album);
      });
      setAlbumSize(2);
    }
     if (window.innerWidth < 950 && window.innerWidth >= 900) {
      
      recommendationAlbum.map((album, index) => {
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(1);
    }
     if (window.innerWidth < 900 && window.innerWidth >= 730) {
      
      recommendationAlbum.map((album, index) => {
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(1);
    }
    if (window.innerWidth < 730) {
      
      recommendationAlbum.map((album, index) => {
        index <= 20 && filtedData.push(album);
      });
      setAlbumSize(20);
    }

    setFilteredAlbumList(filtedData);
  };
  useEffect(() => {
    if (hasWindow && recommendationAlbum !== undefined) {
      window.addEventListener("resize", resizeHanlder);
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [recommendationAlbum, hasWindow]);
  useEffect(() => {
    setFilteredAlbumList([]);
    resizeHanlder();
  }, [recommendationAlbum]);
  
  return (
    <>
      {recommendationAlbum && (
        <h2 className="text-white text-2xl font-bold mt-5 mb-5 ml-5 mdm:text-center sms:text-[5vw]">
          Recommendation Albums List
        </h2>
      )}

      <div className="flex w-calc(100vw-256px)  ml-5 mdm:text-center mdm:justify-center  mdm:hidden">
        {filteredAlbumList &&
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.name + index}>
              <div className="max-lg">
                <RecommendationAlbumCard album={album} albumSize={albumSize} />
              </div>

             
            </div>
          ))}
      </div>
      <div className="flex w-calc(100vw-256px) hidden ml-5 mdm:text-center mdm:justify-center mdm:block mdm:flex mdm:ml-0">
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
                <RecommendationAlbumCard album={album} albumSize={albumSize} />
              </div>

             
            </div>
            </SplideSlide>
          ))}
          </Splide>
      </div>
    </>
  );
};;

export default RecommendationAlbum