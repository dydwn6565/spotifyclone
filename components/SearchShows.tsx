import Image from "next/image";
import React,{useState,useEffect} from "react";

type Props = { searcheadShow: any };
const SearchShows = ({searcheadShow}: Props) => {
    const hasWindow = typeof window !== "undefined";
    const [filteredAlbumList, setFilteredAlbumList] = useState([]);
    const [albumSize, setAlbumSize] = useState(5);
    const resizeHanlder = () => {
      let filtedData = [];
      if (window.innerWidth >= 1380) {
        searcheadShow.body.shows.items.map((artist, index) => {
          index <= 3 && filtedData.push(artist);
        });
        setAlbumSize(4);
      }
      if (window.innerWidth < 1380 && window.innerWidth >= 1100) {
        searcheadShow.body.shows.items.map((artist, index) => {
          index <= 2 && filtedData.push(artist);
        });
        setAlbumSize(3);
      }

      if (window.innerWidth < 1100) {
        searcheadShow.body.shows.items.map((artist, index) => {
          index <= 1 && filtedData.push(artist);
        });
        setAlbumSize(2);
      }

      setFilteredAlbumList(filtedData);
    };
    useEffect(() => {
      if (hasWindow && searcheadShow?.body !== undefined) {
        console.log("hit");
        window.addEventListener("resize", resizeHanlder);
      }
      return () => {
        window.removeEventListener("resize", resizeHanlder);
      };
    }, [searcheadShow, hasWindow]);
   console.log(filteredAlbumList);
  return (
    <div>
      <>
        {searcheadShow && searcheadShow?.body?.shows?.items[0] !== undefined && (
          <div className="ml-10">
            <div className="text-3xl mt-2 text-white ">Shows</div>
            <div className="flex ">
              {filteredAlbumList.map((show) => (
                <div key={show.id}>
                  <div className="w-60 h-80 bg-black flex flex-col items-center mr-10 mt-10 ">
                    <div className="mt-10">
                      <Image
                        width={"160px"}
                        height={"160px"}
                        src={show.images[0] !== undefined && show.images[0].url}
                        alt="episode"
                      />
                    </div>
                    {show.name.length > 10 ? (
                      <div className="text-white">
                        {show.name.slice(0, 20) + "..."}
                      </div>
                    ) : (
                      <div className="text-white">{show.name}</div>
                    )}
                    {show.description.length > 10 ? (
                      <div className="text-white">
                        {show.description.slice(0, 20) + "..."}
                      </div>
                    ) : (
                      <div className="text-white">{show.description}</div>
                    )}
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

export default SearchShows;
