import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import RecentlyPlayedListCard from './RecentlyPlayedListCard';

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
      {filteredAlbumList && <h2 className="text-white text-2xl font-bold mt-5 mb-5 ml-5  mdm:text-center ">
        Recently Played Albums List
      </h2>}
      <div className="flex  flex-wrap w-full min-w-[800px] ml-5 mdm:text-center justify-center ">
        {filteredAlbumList &&
          filteredAlbumList.map((album: any, index: number) => (
            <div key={album?.track.name + index}>
              <div className="max-lg">
                <RecentlyPlayedListCard album={album} albumSize={albumSize} />
              </div>

            
            </div>
          ))}
      </div>
    </>
  );
};

export default RecentlyPlayedList