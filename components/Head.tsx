import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
// import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import VerifiedLogin from './VerifiedLogin';



type Props = {
  color: string
}

function Head({ color }: Props) {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className={`flex justify-between bg-${color}`}>
        <div className="flex flex-row p-5 space-x-5 ml-5">
          <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center">
            <IoIosArrowBack className="w-8 h-8 text-gray-400" />
          </div>
          <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center">
            <IoIosArrowForward className="w-8 h-8  text-gray-400" />
          </div>
        </div>

        <div className="flex flex-row p-5 space-x-10 text-lg ">
          {session ? (
            <div className="mr-10">
              <VerifiedLogin />
            </div>
          ) : (
            <>
              <div className="text-white mt-1">Sign up</div>
              <div className="w-36 h-10 bg-white rounded-full">
                <div className="text-black flex justify-center items-center mt-1">
                  <Link href="/login">
                    <a>Log in</a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Head