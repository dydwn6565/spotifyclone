import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import RecommendationAlbumCard from './RecommendationAlbumCard';



const RecommendationAlbum = ({ recommendationAlbum }: any) => {
  const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    let filtedData = [];
    if (window.innerWidth >= 2000) {
      recommendationAlbum.map((album, index) => {
        index <= 6 && filtedData.push(album);
      });
      setAlbumSize(6);
    }
    if (window.innerWidth < 2000 && window.innerWidth >= 1880) {
      
      recommendationAlbum.map((album, index) => {
        index <= 5 && filtedData.push(album);
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
    if (window.innerWidth < 900) {
      
      recommendationAlbum.map((album, index) => {
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(1);
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
        <h2 className="text-white text-2xl font-bold mt-5 mb-5">
          Recommendation Albums List
        </h2>
      )}

      <div className="flex  flex-wrap w-full min-w-[800px] ">
        {filteredAlbumList &&
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.name + index}>
              <div className="max-lg">
                <RecommendationAlbumCard album={album} albumSize={albumSize} />
              </div>

             
            </div>
          ))}
      </div>
    </>
  );
};;

export default RecommendationAlbum