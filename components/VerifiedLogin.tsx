import { useSession } from 'next-auth/react';
import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
type Props = {}

export default function VerifiedLogin() {
      const { data: session, status } = useSession();
      
  return (
    <>
      <div className="visible lgm:hidden ">
        <div className="h-10 w-32 bg-slate-800 rounded-full flex justify-between items-center ">
          <div className="h-10 w-10 bg-gray-700 rounded-full flex justify-center items-center">
            <AiOutlineUser className="fill-white" />
          </div>
          <div className="text-white text-sm mr-3  ">{session?.user.name}</div>
        </div>
      </div>
      <div className=" h-10 w-10 bg-gray-700 rounded-full  flex justify-center items-center  lg:hidden">
        <AiOutlineUser className="fill-white" />
      </div>
    </>
  );
}