import Image from "next/image";
import React from "react";

type Props = { searcheadAlbums: any };

function SearchTopResult({ searcheadAlbums }: Props) {
  return (
    <>
      <div className="grid grid-cols-10">
        <div className="ml-5 mt-5 text-2xl col-span-2 text-white">
          Top Result
          <div className="w-128 h-72 bg-slate-800  mt-5">
            <div className="ml-10 mt-10 absolute">
              <div className="rounded-full">
                <Image
                  width={"80px"}
                  height={"80px"}
                  src={
                    searcheadAlbums &&
                    searcheadAlbums?.body.albums.items[0] !== undefined &&
                    searcheadAlbums?.body.albums.items[0].images[0] !==
                      undefined &&
                    searcheadAlbums?.body.albums.items[0].images[0].url
                  }
                  alt="Top Result"
                />
              </div>
              <div className="text-white text-2xl my-7 ">
                {searcheadAlbums &&
                  searcheadAlbums?.body.albums.items[0] !== undefined &&
                  searcheadAlbums?.body.albums.items[0].images[0] !==
                    undefined &&
                  searcheadAlbums?.body.albums.items[0].artists[0].name}
              </div>
              <div className="h-9 w-24 bg-black rounded-full">
                <div className="text-white text-lg flex items-center justify-center  ">
                  {searcheadAlbums &&
                    searcheadAlbums?.body.albums.items[0] !== undefined &&
                    searcheadAlbums?.body.albums.items[0].images[0] !==
                      undefined &&
                    searcheadAlbums?.body.albums.items[0].artists[0].type}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="mt-5 text-2xl ml-5 col-span-6">
          <div className="ml-10 text-white">Song</div>
          <div className="w-full h-72 bg-slate-800 mt-5 ml-10   ">
            {searcheadAlbums &&
              searcheadAlbums?.body.albums.items.map((item) => (
                <div key={item.id} className="flex my-2 p-3">
                  <div>
                    <Image
                      width={"40px"}
                      height={"40px"}
                      src={item?.images[0] !== undefined && item?.images[0].url}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col ml-5">
                    <div className="text-white text-sm">{item.name}</div>
                    <div className="text-white text-sm">
                      {item.artists[0].name}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchTopResult;
