import { useSession,signOut } from 'next-auth/react';
import React,{useState} from 'react'
import { AiOutlineUser } from "react-icons/ai";
import Logout from './Logout';
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
     {logout ===true ? <Logout/>:""}
      <div className="visible lgm:hidden ">
        <div className="h-10 w-32 bg-slate-800 rounded-full flex justify-between items-center ">
          <div className="h-10 w-10 bg-gray-700 rounded-full flex justify-center items-center">
            <AiOutlineUser className="fill-white" />
          </div>
          
          <div className="text-white text-sm mr-5 cursor-pointer" onClick={logoutHandler}>Sign out</div>
        </div>
      </div>
      <div className=" h-10 w-10 bg-gray-700 rounded-full  flex justify-center items-center  lg:hidden">
        <AiOutlineUser className="fill-white" />
      </div>
    </>
  );
}