import React,{useState,useEffect} from 'react'
import PlayListCard from './PlayListCard';
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
type Props = {}

function PlayedListComponents(items) {
     const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    let filtedData = [];
    if (window.innerWidth >= 2000) {
      items.items?.playlists?.items.map((album, index) => {
        index <= 7 && filtedData.push(album);
      });
      setAlbumSize(7);
    }
    if (window.innerWidth < 2000 && window.innerWidth >= 1880) {
      
      items.items?.playlists?.items.map((album, index) => {
        index <= 6 && filtedData.push(album);
      });
      setAlbumSize(6);
    }
    if (window.innerWidth < 1880 && window.innerWidth >= 1622) {
      
      items.items?.playlists?.items.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(5);
    }
    if (window.innerWidth < 1622 && window.innerWidth >= 1403) {
      
      items.items?.playlists?.items.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(4);
    }
     if (window.innerWidth < 1403 && window.innerWidth >= 1186) {
    
       items.items?.playlists?.items.map((album, index) => {
         index <= 3 && filtedData.push(album);
       });
       setAlbumSize(3);
     }
    if (window.innerWidth < 1186 && window.innerWidth >= 950) {
      
      items.items?.playlists?.items.map((album, index) => {
        
        index <= 2 && filtedData.push(album);
      });
      setAlbumSize(2);
    }
     if (window.innerWidth < 950 && window.innerWidth >= 900) {
      
      items.items?.playlists?.items.map((album, index) => {
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(1);
    }
    if (window.innerWidth < 900) {
      
      items.items?.playlists?.items.map((album, index) => {
        
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(1);
    }

    setFilteredAlbumList(filtedData);
  };
  useEffect(() => {
    // console.log(items.items?.playlists?.items);
    if (hasWindow && items !== undefined) {
      window.addEventListener("resize", resizeHanlder);
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [items, hasWindow]);
   useEffect(() => {
      setFilteredAlbumList([]);
    resizeHanlder()
    }, [items]);
  return (
     <div>
      
      {items && (
        <h2 className="text-white text-2xl font-bold mt-5 mb-5 ml-5 mdm:text-center sms:text-[5vw]">
          Feactured Ablums
        </h2>
      )}
      <>
      {/* {console.log(filteredAlbumList)} */}
      </>

      <div className="flex  ml-5 w-calc(100vw-256px) mdm:text-center mdm:justify-center mdm:hidden">
        {
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.name + index}>
              <div className="max-lg">
                <PlayListCard album={album} albumSize={albumSize} />
              </div>
            </div>
          ))}
      </div>
      
       <div className="flex  ml-5 w-calc(100vw-256px) hidden mdm:text-center mdm:justify-center mdm:block mdm:flex mdm:ml-0">
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
        {
          filteredAlbumList.map((album: any, index: number) => (
             <SplideSlide>
            <div key={album?.name + index}>
              <div className="max-lg">
                <PlayListCard album={album} albumSize={albumSize} />
              </div>
            </div>
            </SplideSlide>
          ))}
          </Splide>
      </div>
    </div>
  )
}

export default PlayedListComponents