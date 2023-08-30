import React from 'react'
import Image from "next/image";
type Props = {}

function PlayListCard({ album, albumSize }: any) {
  return (
    <div><div>
      
      <div className="   items-center flex  flex-col mr-7 bg-zinc-900 p-5  ">
        {/* <div className={ `h-${(window.innerWidth-550) / albumSize} w-${(window.innerHeight-350)/albumSize}  mt-5 `}> */}
        <div>
          
        </div>
        <div
          style={{
            width: (window.innerWidth - 920) / albumSize + "px",
            
            minWidth: "150px",
            minHeight:"200px",
            
          }}
        >
          
          <div className="min-w-[150px] min-h-[150px]">
          <Image 
            
            width={(window.innerWidth - 790) / albumSize + "px"}
            height={(window.innerWidth - 790) / albumSize + "px"}
            src={album.images[0].url}
            alt={album.images[0].url}
            layout="responsive" 
          />
          </div>
          
          
          <div className="mt-8 ml-3 mb-8 ">
            {album.name.length > 10 ? (
              <div className="text-white">
                {album.name.slice(0, 10) + "...."}
              </div>
            ) : (
              <div className="text-white">{album.name}</div>
            )}
            {album.description.length > 10 ? (
              <div className="text-white">
                {album.description.slice(0, 10) + "...."}
              </div>
            ) : (
              <div className="text-white">{album.description}</div>
            )}
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default PlayListCard