import { useSession,signOut } from 'next-auth/react';
import React,{useState} from 'react'
import { AiOutlineUser } from "react-icons/ai";

type Props = {}

export default function VerifiedLogin() {
      const { data: session, status } = useSession();
      const [logout, setLogout] = useState(false);
      const logoutHandler = ()=>{
          try{
              signOut();
          }catch(error){
            alert(error);
          }
          
      }

  return (
    <>
     
      <div className="visible lgm:hidden ">
        <div className="h-10 w-32 bg-slate-800 rounded-full flex justify-between items-center ">
          <div className="h-10 w-10 bg-gray-700 rounded-full flex justify-center items-center">
            <AiOutlineUser className="fill-white" />
          </div>
          
          <div className="text-white text-sm mr-5 cursor-pointer" onClick={logoutHandler}>Sign out</div>
        </div>
      </div>
      <div className=" h-12 w-20 bg-gray-700 rounded-full  flex justify-center items-center -mt-2 lg:hidden mdm:h-8 mdm:w-12 mdm:p-0 mdm:mt-[2px]">
          <div className="text-white text-sm  cursor-pointer mdm:text-[11px] " onClick={logoutHandler}>Sign out</div>
      </div>
    </>
  );
}