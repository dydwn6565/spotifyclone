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
    <div className={`flex justify-between  bg-${color}  mdl:justify-start mdm:justify-center`}>
      <div className="flex">
        <div className="flex flex-row p-5 space-x-5 ml-5 sms:p-0">
         
        </div>
        <div className=" w-72 h-12 rounded-full mt-3 ml-24  bg-white flex justify-even items-center mdl:w-auto lgm:ml-0  mdm:h-10 mdm:w-40 mdm:ml-0 mdm:mt-4 sms:ml-10">
          <div className="ml-5 scale-150 mdm:scale-100">
            <BsSearch />
          </div>
          <input
            type="text"
            className=" ml-2 focus:outline-none mdl:w-1/3"
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
            <div className="flex mt-5">
              <div className="text-white mt-1 mr-5 ml-2 text-[15px] mdm:text-[13px] smxs:text-[12px] smxs:mr-1">Sign up</div>
              <div className="w-20 h-10 bg-white rounded-full">
                <div className="text-black flex justify-center items-center mt-1 text-[15px] mdm:text-[13px] smxs:text-[12px]">
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
