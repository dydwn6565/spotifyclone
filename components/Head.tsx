import React from 'react'
// import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { IoIosArrowDroprightCircle } from "react-icons/io";

type Props = {}

function Head({}: Props) {
  return (
    <div>
      <div className="flex justify-between bg-black">
        <div className="flex flex-row p-5 space-x-5">
          <IoIosArrowBack className="w-8 h-8  text-white" />
          <IoIosArrowForward className="w-8 h-8  text-white" />
        </div>
        <div className="flex flex-row p-5 space-x-10 text-lg ">
          <div className="text-white mt-1">Sign up</div>
          <div className="w-36 h-10 bg-white rounded-full">
            <div className="text-black flex justify-center items-center mt-1">
              Log in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Head