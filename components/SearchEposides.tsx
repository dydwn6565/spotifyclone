import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import convertmsToMinutes from '../lib/convertmsToMinutes';
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
type Props = {
  searcheadEpisodes:any
};

const SearchEposides = ({searcheadEpisodes}: Props) => {
   const hasWindow = typeof window !== "undefined";
   const [filteredAlbumList, setFilteredAlbumList] = useState([]);
   const [albumSize, setAlbumSize] = useState(5);
   const resizeHanlder = () => {
     let filtedData = [];
     if (window.innerWidth >= 1380) {
       searcheadEpisodes.body.episodes.items.map((artist, index) => {
         index <= 3 && filtedData.push(artist);
       });
       setAlbumSize(4);
     }
     if (window.innerWidth < 1380 && window.innerWidth >= 1100) {
       
       searcheadEpisodes.body.episodes.items.map((artist, index) => {
         index <= 2 && filtedData.push(artist);
       });
       setAlbumSize(3);
     }
     
     if (window.innerWidth < 1100 && window.innerWidth >= 730) {
       searcheadEpisodes.body.episodes.items.map((artist, index) => {
         index <= 1 && filtedData.push(artist);
       });
       setAlbumSize(2);
     }
     
      if (window.innerWidth < 730) {
       searcheadEpisodes.body.episodes.items.map((artist, index) => {
         index <= 6 && filtedData.push(artist);
       });
       setAlbumSize(6);
     }

     setFilteredAlbumList(filtedData);
   };

   useEffect(()=>{
    if(searcheadEpisodes?.body !== undefined){
        resizeHanlder();
    }
   },[searcheadEpisodes])
   useEffect(() => {
     if (hasWindow && searcheadEpisodes?.body !== undefined) {
       
       window.addEventListener("resize", resizeHanlder);
     }
     return () => {
       window.removeEventListener("resize", resizeHanlder);
     };
   }, [searcheadEpisodes, hasWindow]);
   
  return (
    <div>
      <>
        {searcheadEpisodes && searcheadEpisodes !== undefined && (
          <div className="ml-10 mdm:ml-0">
            <div className="text-3xl my-5 text-white mdm:flex mdm:justify-center sms:text-[5vw]">Episodes</div>
            <div className="flex mdm:justify-center mdm:hidden">
              {filteredAlbumList &&
                filteredAlbumList.map((episode) => (
                  <div key={episode.id}>
                    <div className="w-48 h-80 bg-black rounded-2xl flex flex-col items-center mr-10  mt-10 rounded-2xl ">
                      <div className="mt-10 min-w-[150px] min-h-[150px]  ">
                        <Image
                          width={"160px"}
                          height={"160px"}
                          src={
                            episode.images[0] !== undefined &&
                            episode.images[0].url
                          }
                          alt="episode"
                          layout="responsive" 
                        />
                      </div>
                      {episode.name.length > 10 ? (
                        <div className="text-white  sms:text-[13px]">
                          {episode.name.slice(0, 20) + "..."}
                        </div>
                      ) : (
                        <div className="text-white sms:text-[13px]">{episode.name}</div>
                      )}
                      <div className="flex">
                        <div className="text-white text-sm mr-2 sms:text-[12px]">
                          {episode.release_date}
                        </div>
                        <div className="text-white text-sm sms:text-[12px]">
                          {convertmsToMinutes(episode.duration_ms)}
                        </div>
                      </div>
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
                filteredAlbumList.map((episode) => (
                  <SplideSlide key={episode.id}>
                  <div >
                    <div className="w-48 h-80 bg-black rounded-2xl flex flex-col items-center mr-10 rounded-2xl sms:w-[125px] sms:h-48 smxs:w-[95px] smxs:h-36">
                      <div className="mt-10 mdm:w-[120px] mdm:h-[120px] sms:w-[17vw] sms:h-[17vw] sms:-mt-[-14px] ">
                        <Image
                          width={"160px"}
                          height={"160px"}
                          src={
                            episode.images[0] !== undefined &&
                            episode.images[0].url
                          }
                          alt="episode"
                          layout="responsive" 
                        />
                      </div>
                      <div className='sms:my-3 sms:flex sms:flex-col sms:items-center sms:justify-center '>

                      {episode.name.length > 10 ? (
                        <div className="text-white  sms:text-[13px] sms:ml-1 smxs:text-[10px]">
                          {episode.name.slice(0, 20) + "..."}
                        </div>
                      ) : (
                        <div className="text-white sms:text-[13px] smxs:text-[10px]">{episode.name}</div>
                      )}
                      <div className="flex">
                        <div className="text-white text-sm mr-2 sms:text-[12px] smxs:text-[10px] smxs:mr-0">
                          {episode.release_date}
                        </div>
                        <div className="text-white text-sm sms:text-[12px] smxs:hidden">
                          {convertmsToMinutes(episode.duration_ms)}
                        </div>
                      </div>
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

export default SearchEposides