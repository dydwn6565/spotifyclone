import Link from 'next/link';
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import VerifiedLogin from './VerifiedLogin';
type Props = {}

export default function LibraryHead({}: Props) {
    const router = useRouter();
    const pathname = router.pathname.split("/")[2]
    const { data: session, status } = useSession();
  return (
    <div>
      <div>
        <div className="flex  bg-black">
          <div className="flex flex-1 p-5 space-x-7  items-center ">
            <IoIosArrowBack className="w-8 h-8  text-white" />
            <IoIosArrowForward className="w-8 h-8  text-white" />

            <div
              className={
                pathname === "playlists"
                  ? "text-white text-lg cursor-pointer w-24 h-10 bg-slate-700 flex items-center justify-center rounded-lg"
                  : "text-white text-lg cursor-pointer flex items-center justify-center"
              }
            >
              <Link href={"/collection/playlists"}>
                <div className="text-white pb-3 cursor-pointer">
                  <>
                    <a>Playlist</a>
                  </>
                </div>
              </Link>
            </div>

            <div
              className={
                pathname === "artists"
                  ? "text-white text-lg cursor-pointer w-24 h-10 bg-slate-700  flex items-center justify-center rounded-lg"
                  : "text-white text-lg cursor-pointer flex items-center justify-center"
              }
            >
              <Link href={"/collection/artists"}>
                <div className="text-white pb-3 cursor-pointer">
                  <>
                    <a>Artist</a>
                  </>
                </div>
              </Link>
            </div>
            <div
              className={
                pathname === "albums"
                  ? "text-white text-lg cursor-pointer w-24 h-12 bg-slate-700  flex items-center justify-center rounded-lg"
                  : "text-white text-lg cursor-pointer flex items-center justify-center"
              }
            >
              <Link href={"/collection/albums"}>
                <div className="text-white pb-3 cursor-pointer ">
                  <>
                    <a>Album</a>
                  </>
                </div>
              </Link>
            </div>
          </div>
          {session ? (
            <div className='mr-10'>

              <VerifiedLogin />
            </div>
          ) : (
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
                  )}
         </div>
      </div>
    </div>
  );
}