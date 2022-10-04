import Image from 'next/image';
import React from 'react'

type Props = {}

const RecommendationAlbumCard = ({ album, albumSize }: any) => {
    
  return (
    <div>
      <div>
        <div className="   items-center flex  flex-col mr-7 bg-zinc-900 p-5  ">
          {/* <div className={ `h-${(window.innerWidth-550) / albumSize} w-${(window.innerHeight-350)/albumSize}  mt-5 `}> */}
          <div
            style={{
              width: (window.innerWidth - 1050) / albumSize + "px",
              minWidth: "190px",
            }}
          >
            <Image
              // width={(window.innerWidth - 650) / albumSize + "px"}
              // height={(window.innerHeight - 250) / albumSize + "px"}
              width={"170px"}
              height={"170px"}
              src={album.album.images[1].url}
              alt={album.album.images[1].url}
            />
            <div className="mt-8 mr-auto mb-8 ">
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