import React from 'react'
import Image from "next/image";
import playlistimage from '../images/playlistImage.jpg'
import Link from 'next/link';


function MyPlayListCard({album,albumSize}) {
  return (
   <div>
    <Link href={`/playlist/my/${album.href.split("/")[5]}`} >
    
      <div className="cursor-pointer items-center flex  flex-col mr-7 bg-zinc-900 p-5 mdm:mr-2  sms:w-[115px] sms:h-48 smxs:w-[95px] smxs:h-36 ">
        {/* <div className={ `h-${(window.innerWidth-550) / albumSize} w-${(window.innerHeight-350)/albumSize}  mt-5 `}> */}
        
        <div className="min-w-[150px] mdm:flex mdm:flex-col mdm:justify-center mdm:items-center "
          style={{
            width: (window.innerWidth - 920) / albumSize + "px",
            
            // minWidth: "150px",
            // minHeight: "200px",
            
          }}
        >
          <div className=" mdm:w-[20vw] mdm:h-[20vw]  sms:w-[17vw] sms:h-[17vw] sms:mt-3 ">
            <Image
              width={(window.innerWidth - 790) / albumSize + "px"}
              height={(window.innerWidth - 790) / albumSize + "px"}
              src={playlistimage}
              alt={"playlistimage"}
              layout="responsive"
            />
          </div>

          <div className="mt-8 ml-3 mb-8 sms:mt-0 sms:text-[13px] smxs:mt-1">
            {/* {album.name.length > 10 ? (
              <div className="text-white">
                {album.name.slice(0, 10) + "...."}
              </div>
            ) : ( */}
              <div className="text-white sms:mt-0 sms:text-[13px] smxs:mt-1">{album.name}</div>
            {/* )} */}
            
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default MyPlayListCard