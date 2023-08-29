import Image from 'next/image';
import React from 'react'

type Props = {}

const RecommendationAlbumCard = ({ album, albumSize }: any) => {
    
  return (
    <div>
      <div>
        <div className="   items-center flex  flex-col mr-7 bg-zinc-900 p-5  ">
          
          <div
            style={{
             width: (window.innerWidth - 890) / albumSize + "px",
            // width:"10vw",
            // height:"15vw",
            minWidth: "150px",
            minHeight:"200px",
            maxWidth:"190px"
            }}
          >
         
           <div className="min-w-[150px] min-h-[150px]">

            <Image
              
              width={(window.innerWidth - 790) / albumSize + "px"}
            height={(window.innerWidth - 790) / albumSize + "px"}
              src={album.album.images[1].url}
              alt={album.album.images[1].url}
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
              {album.artists[0].name.length > 10 ? (
                <div className="text-white">
                  {album.artists[0].name.slice(0, 10) + "...."}
                </div>
              ) : (
                <div className="text-white">{album.artists[0].name}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationAlbumCard