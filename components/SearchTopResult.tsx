import Image from "next/image";
import React from "react";

type Props = { searcheadAlbums: any };

function SearchTopResult({ searcheadAlbums }: Props) {
  return (
    <>
      {searcheadAlbums &&
        searcheadAlbums?.body?.albums?.items[0] !== undefined && (
          <div className="flex flex-row justify-center  xlm:flex-col  ">
            <div className=" mt-5 text-2xl  text-white sms:mt-0 ">
              <div className="flex mdm:justify-center sms:text-[5vw] ml-10  sms:ml-0">Top Result</div>
              <div className="flex mdm:justify-center">
              <div className="w-96 h-72 bg-zinc-800  mt-5 sms:w-[60vw] sms:h-[50vw] sms:mt-0 ">
                <div className="ml-10 mt-10 absolute">
                  <div className="rounded-full sms:w-[20vw] sms:h-[25vw] ">
                    <Image
                      width={"80px"}
                      height={"80px"}
                      src={
                        searcheadAlbums?.body.albums.items[0] !== undefined &&
                        searcheadAlbums?.body.albums.items[0].images[0] !==
                          undefined &&
                        searcheadAlbums?.body.albums.items[0].images[0].url
                      }
                      alt="Top Result"
                      layout="responsive"
                    />
                  </div>
                  <div className="text-white text-2xl my-7 sms:text-[5vw] sms:my-0">
                    {searcheadAlbums?.body.albums.items[0] !== undefined &&
                      searcheadAlbums?.body.albums.items[0].images[0] !==
                        undefined &&
                      searcheadAlbums?.body.albums.items[0].artists[0].name}
                  </div>
                  {/* <div className="h-9 w-24 bg-black rounded-full  sms:hidden">
                    <div className="text-white text-lg flex items-center justify-center ">
                      {searcheadAlbums?.body.albums.items[0] !== undefined &&
                        searcheadAlbums?.body.albums.items[0].images[0] !==
                          undefined &&
                        searcheadAlbums?.body.albums.items[0].artists[0].type}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
              </div>
            <div className="col-span-1"></div>
            <div className="mt-5 text-2xl ">
              <div className="ml-10 text-white mdm:flex mdm:justify-center sms:text-[5vw] sms:ml-0">Song</div>
              <div className="mdm:flex mdm:justify-center">

              <div className=" h-72 bg-zinc-900 mt-5 ml-10 mdm:w-[50vw]   ">
                {searcheadAlbums &&
                  searcheadAlbums?.body.albums.items.map((item) => (
                    <div key={item.id} className="flex my-2 p-3">
                      <div>
                        <Image
                          width={"40px"}
                          height={"40px"}
                          src={
                            item?.images[0] !== undefined && item?.images[0].url
                          }
                          alt={item.name}
                          // layout="responsive"
                        />
                      </div>
                      <div className="flex flex-col ml-5 sms: ml-1.5">
                        <div className="text-white text-sm sms:text-[2.5vw]">{item.name}</div>
                        <div className="text-white text-sm sms:text-[2.5vw]">
                          {item.artists[0].name}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default SearchTopResult;
