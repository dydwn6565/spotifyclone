import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState, selectedPlaylists } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/millisToMinutesAndSeconds';
import Head from './Head';
import VerifiedLogin from './VerifiedLogin';

type Props = {}

const Playlist = (props: Props) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();
  const [track,setTrack]= useState<any>();
    const [currentTrackId, setCurrentTrackId] =
      useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const router = useRouter();
  const pathname = router.asPath.split("/")[2];
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  useEffect(()=>{

      spotifyApi
        .getAlbum(pathname)
        .then((res) => {
    
          setSelectedPlaylist(res);
          setTrack(res.body.tracks.items);
          console.log(res);
        }).catch((error)=>{

        })
            
  },[])

  const playSong = (index: number) => {
    const songInfo = track[index];
    setCurrentTrackId(songInfo.track_number);
    setIsPlaying(true);
    // spotifyApi.play({uris:[songInfo.track.uri]})
  };
  console.log(selectedPlaylist);
  return (
    <div>
      {/* <div className=" bg-gradient-to-r from-lime-800 to-orange-600 h-128 w-full">
            <div className="flex justify-between">

          <div className="flex flex-row p-5 space-x-5">
            <IoIosArrowBack className="w-8 h-8  text-white" />
            <IoIosArrowForward className="w-8 h-8  text-white" />
          </div>

          <div className="flex flex-row p-5 space-x-10 text-lg ">
            {session ? (
              <div className="mr-10">
                <VerifiedLogin />
              </div>
            ) : (
              <>
                <div className="text-white mt-1">Sign up</div>
                <div className="w-36 h-10 bg-white rounded-full">
                  <div className="text-black flex justify-center items-center mt-1">
                    <Link href="/login">
                      <a>Log in</a>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
            </div>
          <div className="text-white text-8xl ml-20 mt-40">{selectedPlaylist?.body?.items[0]?.artists[0]?.name}</div>
        </div> */}
      <Head />
      <div className=" h-screen bg-slate-800">
        <div className="flex">
          {selectedPlaylist &&
          selectedPlaylist?.body?.images[0] === undefined ? (
            <div className="h-72 w-72 bg-slate-700 ml-7 flex items-center justify-center mt-5">
              <div className="text-7xl ">
                <BsMusicNoteBeamed />
              </div>
            </div>
          ) : (
            <div className="ml-7 mt-5">
              <Image
                width={"288px"}
                height={"288px"}
                src={selectedPlaylist && selectedPlaylist?.body.images[0].url}
                alt={selectedPlaylist && selectedPlaylist?.body.name}
              />
            </div>
          )}

          <div>
            <div className="text-white ml-5 mt-10">
              {selectedPlaylist && selectedPlaylist?.body?.type}
            </div>
            <div className="text-white text-8xl ml-3 mt-5">
              {selectedPlaylist && selectedPlaylist?.body?.name}
            </div>

            <div className="flex space-x-1 mt-20 ml-5">
              <div className="text-white">
                {/* {selectedPlaylist && selectedPlaylist[0]?.owner.display_name} */}
              </div>
              {selectedPlaylist &&
                selectedPlaylist?.body?.images[0] !== undefined && (
                  <div className="text-white">
                    {selectedPlaylist &&
                      selectedPlaylist.body.tracks.total + "  songs"}
                  </div>
                )}
            </div>
          </div>
        </div>

        {selectedPlaylist && selectedPlaylist?.body.images[0] !== undefined && (
          <div className="grid grid-cols-12 mt-10 text-white mb-5">
            <div className="col-span-10 ml-10"># Title</div>
            
            <div className="col-span-1 ml-24">
              <AiOutlineClockCircle />
            </div>
          </div>
        )}
        <hr className="ml-10 mr-10 bg-transparent my-5" />
        <div>
          {selectedPlaylist &&
            selectedPlaylist?.body.images[0] !== undefined &&
            selectedPlaylist?.body.tracks.items.map((song, index) => (
              <div key={song.track_number + index}>
                <div
                  className="  ml-10 p-2 grid grid-cols-11 items-center "
                  onClick={() => playSong(index)}
                >
                  <div className="text-white flex -ml-2  col-span-10">
                    <div className="mr-5 mt-2">{index + 1}</div>
                   
                    <div className=" text-white ml-2 ">
                      <div>{song.name}</div>
                      <div>{song.artists[0].name}</div>
                    </div>
                  </div>
             

                  <div className="text-white">
                    {millisToMinutesAndSeconds(song.duration_ms)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist