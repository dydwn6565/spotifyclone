import React,{useState,useEffect} from 'react'
import { useRecoilState } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import MyPlayListCard from './MyPlayListCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';

type Props = {}

function MyPlayListList({}: Props) {
   const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const [playlists, setPlaylists] = useRecoilState(playlistState);
  const resizeHanlder = () => {
    let filtedData = [];
    if (window.innerWidth >= 2000) {
      playlists?.map((album, index) => {
        index <= 7 && filtedData.push(album);
      });
      setAlbumSize(7);
    }
    if (window.innerWidth < 2000 && window.innerWidth >= 1880) {
      
      playlists?.map((album, index) => {
        index <= 6 && filtedData.push(album);
      });
      setAlbumSize(6);
    }
    if (window.innerWidth < 1880 && window.innerWidth >= 1622) {
      
      playlists?.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(5);
    }
    if (window.innerWidth < 1622 && window.innerWidth >= 1403) {
      
      playlists?.map((album, index) => {
        index <= 4 && filtedData.push(album);
      });
      setAlbumSize(4);
    }
     if (window.innerWidth < 1403 && window.innerWidth >= 1186) {
    
       playlists?.map((album, index) => {
         index <= 3 && filtedData.push(album);
       });
       setAlbumSize(3);
     }
    if (window.innerWidth < 1186 && window.innerWidth >= 950) {
      
      playlists?.map((album, index) => {
        
        index <= 2 && filtedData.push(album);
      });
      setAlbumSize(2);
    }
     if (window.innerWidth < 950 && window.innerWidth >= 900) {
      
      playlists?.map((album, index) => {
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(1);
    }
    if (window.innerWidth < 900) {
      
      playlists?.map((album, index) => {
        
        index <= 1 && filtedData.push(album);
      });
      setAlbumSize(1);
    }
    setFilteredAlbumList(filtedData);
  };
  useEffect(() => {
    // console.log(items.items?.playlists?.items);
    if (hasWindow && playlists !== undefined) {
      window.addEventListener("resize", resizeHanlder);
    }
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, [playlists, hasWindow]);
   useEffect(() => {
      setFilteredAlbumList([]);
    resizeHanlder()
    }, [playlists]);
  return (
    <>
    <div>
      
      {playlists && (
        <h2 className="text-white text-2xl font-bold mt-5 mb-5 ml-5 mdm:text-center sms:text-[5vw] ">
          PlayList
        </h2>
      )}

      
      
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
        {playlists &&
          playlists.map((album: any, index: number) => (
            <SplideSlide key={album?.name + index}>
            <div >
              <div className="max-lg">
                <MyPlayListCard album={album} albumSize={albumSize} />
              </div>
            </div>
            </SplideSlide>
          ))}
          </Splide>
      </div>
      
    </div>
    </>
  )
}

export default MyPlayListList