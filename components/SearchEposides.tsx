import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import convertmsToMinutes from '../lib/convertmsToMinutes';

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
     
     if (window.innerWidth < 1100) {
       searcheadEpisodes.body.episodes.items.map((artist, index) => {
         index <= 1 && filtedData.push(artist);
       });
       setAlbumSize(2);
     }

     setFilteredAlbumList(filtedData);
   };

   useEffect(()=>{
    if(searcheadEpisodes?.body !== undefined){
        resizeHanlder();
    }
   },[])
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
          <div className="ml-10">
            <div className="text-3xl mt-4 text-white ">Episodes</div>
            <div className="flex ">
              {filteredAlbumList &&
                filteredAlbumList.map((episode) => (
                  <div key={episode.id}>
                    <div className="w-60 h-80 bg-black flex flex-col items-center mr-10 mt-10 rounded-2xl">
                      <div className="mt-10 ">
                        <Image
                          width={"160px"}
                          height={"160px"}
                          src={
                            episode.images[0] !== undefined &&
                            episode.images[0].url
                          }
                          alt="episode"
                        />
                      </div>
                      {episode.name.length > 10 ? (
                        <div className="text-white">
                          {episode.name.slice(0, 20) + "..."}
                        </div>
                      ) : (
                        <div className="text-white">{episode.name}</div>
                      )}
                      <div className="flex">
                        <div className="text-white text-sm mr-2">
                          {episode.release_date}
                        </div>
                        <div className="text-white text-sm">
                          {convertmsToMinutes(episode.duration_ms)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SearchEposides