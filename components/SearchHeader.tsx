import Link from 'next/link';
import React,{FC,useState,useEffect,Dispatch,SetStateAction} from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsSearch } from "react-icons/bs";
import useSpotify from '../hooks/useSpotify';
interface ChildPropsType {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
}
const SearchHeader: FC<ChildPropsType> = ({ setSearch }) => {
  // const spotifyApi = useSpotify();
  // const [search, setSearch] = useState<string |undefined>();
  // useEffect(() => {
  //   if (search) {
  //     spotifyApi
  //       .searchAlbums(search, { limit: 4, offset: 1 })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //     spotifyApi
  //       .searchArtists(search, { limit: 4, offset: 1 })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //     spotifyApi
  //       .searchEpisodes(search, { limit: 4, offset: 1 })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //     spotifyApi
  //       .searchShows(search, { limit: 4, offset: 1 })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //     spotifyApi
  //       .search(search, ["track", "album"], { limit: 5, offset: 1 })
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   }
  // }, [spotifyApi,search]);

  return (
    <div>
      <div className="flex justify-between bg-black">
        <div className="flex flex-row p-5 ">
          <IoIosArrowBack className="w-8 h-8  text-white" />
          <IoIosArrowForward className="w-8 h-8  text-white" />
        </div>
        <div className=" w-96 h-12 rounded-full mt-3 bg-white flex justify-even items-center">
          <div className="ml-2 scale-150">
            <BsSearch />
          </div>
          <input
            type="text"
            className=" ml-2 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-row p-5 space-x-10 text-lg ">
          <div className="text-white mt-1">Sign up</div>
          <div className="w-36 h-10 bg-white rounded-full">
            <div className="text-black flex justify-center items-center mt-1">
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader