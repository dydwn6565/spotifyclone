import Link from 'next/link'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { GrHomeRounded } from 'react-icons/gr'

type Props = {}

function BottomNav({}: Props) {
  return (
    <div className="mdm:fixed mdm:bottom-0 mdm:w-full mdm:h-20 mdm:text-white mdm:bg-zinc-900 mdm:flex mdm:mt-6 mdm:place-content-evenly">
        <Link href={"/"}>
          <div className="text-white pb-3 mt-6 cursor-pointer">
            <>
              <a>
                <div className="flex">
                  <GrHomeRounded className="scale-225 fill-white" />
                  <div className="pl-6 text-white"></div>
                </div>
              </a>
            </>
          </div>
        </Link>

        <Link href={"/search"}>
          <div className="text-white mt-6 pb-6 cursor-pointer">
            <>
              <a>
                <div className="flex ">
                  <BsSearch className="scale-225 fill-white" />
                  <div className="pl-6 text-white"> </div>
                </div>
              </a>
            </>
          </div>
        </Link>
      </div>
  )
}

export default BottomNav