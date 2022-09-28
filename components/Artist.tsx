import React from "react";
import { BiUserVoice } from "react-icons/bi";
type Props = {};

const Artist = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900 h-screen ">
      <BiUserVoice className="scale-875 fill-white" />

      <div className="text-white mt-16  text-3xl font-bold">
        Follow your first Artist
      </div>
      <div className="text-white mt-8 text-2xl">
        Press the follow button to follow your favorite artist
      </div>
      <button className="bg-white w-36 h-12 rounded-3xl mt-10">
        Find Artist
      </button>
    </div>
  );
};

export default Artist;
