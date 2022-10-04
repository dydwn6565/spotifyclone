import Image from "next/image";
import React, { useEffect,useState} from "react";

type Props = { searcheadArtists: any };
const SearchArtists = ({ searcheadArtists }: Props) => {
  const hasWindow = typeof window !== "undefined";
  const [filteredAlbumList, setFilteredAlbumList] = useState([]);
  const [albumSize, setAlbumSize] = useState(5);
  const resizeHanlder = () => {
    let filtedData = [];
    if (window.innerWidth >= 1380) {
      searcheadArtists.body.artists.items.map((artist, index) => {
        index <= 3 && filtedData.push(artist);
      });
      setAlbumSize(4);
    }
    if (window.innerWidth < 1380 && window.innerWidth >= 1100) {
      // console.log(searcheadArtists);
      searcheadArtists.body.artists.items.map((artist, index) => {
        index <= 2 && filtedData.push(artist);
      });
      setAlbumSize(3);
    }
    
    if (window.innerWidth < 1100) {
      
      searcheadArtists.body.artists.items.map((artist, index) => {
        index <= 1 && filtedData.push(artist);
      });
      setAlbumSize(2);
    }

    setFilteredAlbumList(filtedData);
  };
    useEffect(() => {
      if (hasWindow && searcheadArtists?.body !== undefined) {
        console.log("hit");
        window.addEventListener("resize", resizeHanlder);
      }
      return () => {
        window.removeEventListener("resize", resizeHanlder);
      };
    }, [searcheadArtists, hasWindow]);

  
  return (
    <>
      {filteredAlbumList && filteredAlbumList !== undefined && (
        <div>
          <div className="text-3xl my-5 ml-10 text-white">Artists</div>
          <div className="flex">
            {filteredAlbumList &&
              filteredAlbumList.map((artist) => (
                <div key={artist?.id}>
                  <div className="w-60 h-80 bg-black rounded-2xl flex ml-10 flex-col items-center">
                    <div className="rounded-full mt-10">
                      <Image
                        width={"160px"}
                        height={"160px"}
                        src={
                          artist.images[0] !== undefined &&
                          artist?.images[0].url
                        }
                        alt="artist image"
                        // className="rounded-full mt-10"
                      />
                    </div>
                    <div className="mr-12 my-5">
                      <div className="text-white">{artist.name}</div>
                      <div className="text-white">{artist.type}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchArtists;
