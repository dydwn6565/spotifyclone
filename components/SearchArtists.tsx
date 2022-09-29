import React, { Dispatch, SetStateAction, FC } from "react";

type Props = { searcheadArtists: any };
const SearchArtists = ({ searcheadArtists }: Props) => {
  return (
    <div>
      <div className="text-3xl my-5 ml-10 text-white">Artists</div>
      <div className="flex">
        {searcheadArtists &&
          searcheadArtists?.body.artists.items.map((artist) => (
            <>
              <div className="w-60 h-80 bg-black rounded-2xl flex ml-10 flex-col items-center">
                <img
                  src={artist.images[0] !==undefined &&artist?.images[0].url}
                  alt="artist image"
                  className="rounded-full h-40 w-40 mt-10"
                />
                <div className="mr-12 my-5">
                  <div className="text-white">{artist.name}</div>
                  <div className="text-white">{artist.type}</div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default SearchArtists;
