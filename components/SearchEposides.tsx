import Image from 'next/image';
import React from 'react'
import convertmsToMinutes from '../lib/convertmsToMinutes';

type Props = {
  searcheadEpisodes:any
};

const SearchEposides = ({searcheadEpisodes}: Props) => {
  return (
    <div>
      <>
        <div className="ml-10">
          <div className="text-3xl mt-2 text-white ">Episodes</div>
          <div className="flex ">
            {searcheadEpisodes &&searcheadEpisodes?.body.episodes.items.map(
              (episode) => (
                <>
                  <div className="w-60 h-80 bg-black flex flex-col items-center mr-10 mt-10 ">
                    <div className='mt-10'>

                    <Image width={"160px"} height={"160px"}
                      src={episode.images[0] !==undefined &&episode.images[0].url}
                      alt="episode"
                      // className="w-40 h-40 mt-10 "
                    />
                    </div>
                    {episode.name.length > 10 ? (
                      <div className="text-white">
                        {episode.name.slice(0, 20) + "..."}
                      </div>
                    ) : (
                      <div className="text-white">{episode.name}</div>
                    )}
                    <div className="flex">
                      <div className="text-white text-sm mr-2">
                        {episode.release_date}
                      </div>
                      <div className="text-white text-sm">
                        {convertmsToMinutes(episode.duration_ms)}
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default SearchEposides