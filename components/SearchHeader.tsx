import Link from "next/link";
import React, { FC, Dispatch, SetStateAction,useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import VerifiedLogin from "./VerifiedLogin";
import { useSession } from "next-auth/react";

interface ChildPropsType {
  searchHanlder: Dispatch<SetStateAction<string | undefined>>;
  color:string;
}
const SearchHeader: FC<ChildPropsType> = ({ searchHanlder,color }) => {
  const { data: session, status } = useSession();
  // const hasWindow = typeof window !== "undefined";
  //   useEffect(() => {
  //     if (hasWindow && recentlyPlayedList !== undefined) {
  
  //       window.addEventListener("resize", resizeHanlder);
  //     }
  //     return () => {
  //       window.removeEventListener("resize", resizeHanlder);
  //     };
  //   }, [recentlyPlayedList, hasWindow]);
  return (
    <div className={`flex justify-between  bg-${color} min-w-[700px] `}>
      <div className="flex">
        <div className="flex flex-row p-5 space-x-5 ml-5">
          <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center">
            <IoIosArrowBack className="w-8 h-8 text-gray-400" />
          </div>
          <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center">
            <IoIosArrowForward className="w-8 h-8  text-gray-400" />
          </div>
        </div>
        <div className=" w-96 h-12 rounded-full mt-3  bg-white flex justify-even items-center">
          <div className="ml-5 scale-150">
            <BsSearch />
          </div>
          <input
            type="text"
            className=" ml-2 focus:outline-none"
            onChange={(e) => searchHanlder(e.target.value)}
          />
        </div>
      </div>
      <div className="relative  top-0 right-0 lg:absolute">
        {session ? (
          <div className="flex flex-row p-5 space-x-10 text-lg   ">
            <div className="mr-10">
              <VerifiedLogin />
            </div>
          </div>
        ) : (
          <>
            <div className="flex">
              <div className="text-white mt-1">Sign up</div>
              <div className="w-36 h-10 bg-white rounded-full">
                <div className="text-black flex justify-center items-center mt-1">
                  <Link href="/login">
                    <a>Log in</a>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;
