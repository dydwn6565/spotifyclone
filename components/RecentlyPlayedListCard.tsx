import Image from 'next/image';
import React from 'react'

type Props = {}

const RecentlyPlayedListCard = ({ album, albumSize }: any) => {
  return (
   
    <div>
      <div className="   items-center flex  flex-col mr-7 bg-zinc-900 p-5  ">
        
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
            src={album.track.album.images[1].url}
            alt={album.track.album.images[1].url}
          />
          <div className="mt-8 mr-auto mb-8 ">
            {album.track.name.length > 10 ? (
              <div className="text-white">
                {album.track.name.slice(0, 10) + "...."}
              </div>
            ) : (
              <div className="text-white">{album.track.name}</div>
            )}
            {album.track.album.artists[0].name.length > 10 ? (
              <div className="text-white">
                {album.track.album.artists[0].name.slice(0, 10) + "...."}
              </div>
            ) : (
              <div className="text-white">{album.track.album.artists[0].name}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyPlayedListCard