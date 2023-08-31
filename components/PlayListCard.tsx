import React from "react";
import Image from "next/image";
type Props = {};

function PlayListCard({ album, albumSize }: any) {
  return (
    <div>
      <div>
        <div className="   items-center flex  flex-col mr-7 bg-zinc-900 p-5  mdm:mr-2  sms:w-[115px] sms:h-48 smxs:w-[95px] smxs:h-36">
          {/* <div className={ `h-${(window.innerWidth-550) / albumSize} w-${(window.innerHeight-350)/albumSize}  mt-5 `}> */}
          <div></div>
          <div className="min-w-[150px] mdm:flex mdm:flex-col mdm:justify-center mdm:items-center "
            style={{
              width: (window.innerWidth - 920) / albumSize + "px",

              // minWidth: "150px",
              // minHeight: "200px",
            }}
          >
            <div className="mdm:w-[20vw] mdm:h-[20vw]  sms:w-[17vw] sms:h-[17vw] sms:mt-3">
              <Image
                width={(window.innerWidth - 790) / albumSize + "px"}
                height={(window.innerWidth - 790) / albumSize + "px"}
                src={album.images[0].url}
                alt={album.images[0].url}
                layout="responsive"
              />
            </div>

            <div className="mt-8 ml-3 mb-8 sms:mt-0 sms:text-[13px] smxs:mt-1">
              {album.name.length > 10 ? (
                <div className="text-white  ">
                  {album.name.slice(0, 10) + "...."}
                </div>
              ) : (
                <div className="text-white sms:mt-0 sms:text-[13px] smxs:mt-1">{album.name}</div>
              )}
              {album.description.length > 10 ? (
                <div className="text-white ">
                  {album.description.slice(0, 10) + "...."}
                </div>
              ) : (
                <div className="text-white ">{album.description}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayListCard;
