import React from 'react'


type Props = { searcheadShow: any };
const SearchShows = (searcheadShow: Props) => {
  return (
    <div>
      <>
        <div className="ml-10">
          <div className="text-3xl mt-2 text-white ">Shows</div>
          <div className="flex ">
            {searcheadShow&&searcheadShow?.searcheadShow?.body?.shows.items.map(
              (show) => (
                <>
                  <div className="w-60 h-80 bg-black flex flex-col items-center mr-10 mt-10 ">
                    <img
                      src={show.images[0] !==undefined &&show.images[0].url}
                      alt="episode"
                      className="w-40 h-40 mt-10 "
                    />
                    {show.name.length > 10 ? (
                      <div className="text-white">
                        {show.name.slice(0, 20) + "..."}
                      </div>
                    ) : (
                      <div className="text-white">{show.name}</div>
                    )}
                    {show.description.length > 10 ? (
                      <div className="text-white">
                        {show.description.slice(0, 20) + "..."}
                      </div>
                    ) : (
                      <div className="text-white">{show.description}</div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        </div>
        <>{console.log(searcheadShow)}</>
      </>
    </div>
  );
};

export default SearchShows