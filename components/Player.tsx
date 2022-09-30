import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/playlistAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { HiPause, HiPlay, HiSwitchHorizontal } from "react-icons/hi";
import { HiRewind } from "react-icons/hi";
import { HiFastForward } from "react-icons/hi";
import { HiReply } from "react-icons/hi";
import { BsFillVolumeDownFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { debounce } from "lodash";
import Image from "next/image";
type Props = {};

function Player({}: Props) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVloume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing: " + data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVloume(50);
    }
  }, [currentTrackIdState, spotifyApi, session, currentTrackId]);
  console.log(songInfo);

  // useEffect(() => {
  //   if (volume > 10 && volume < 100) {
  //     debouncedAdjustVolume(volume);
  //   }
  // }, [volume]);

  // const debouncedAdjustVolume = useCallback(
  //   debounce((volume) => {
  //     spotifyApi.setVolume(volume).catch((error) => {
  //       console.log(error);
  //     });
  //   }, 500),
  //   []
  // );

  return (
    <div className="sticky bottom-0  h-24 bg-slate-800 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4 ">
        <Image
          width={"40px"}
          height={"40px"}
          className="hidden md:inline "
          src={songInfo?.data.album.images?.[0]?.url}
          alt={songInfo?.data.album.images?.[0]?.url}
        />
        <div>
          <h3>{songInfo?.data.name}</h3>
          <p>{songInfo?.data.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <HiSwitchHorizontal className="button" />
        <HiRewind className="button" />
        {isPlaying ? (
          <HiPause onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <HiPlay onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <HiFastForward className="button" />
        <HiReply className="button" />
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <BsFillVolumeDownFill
          onClick={() => volume > 0 && setVloume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVloume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <BsFillVolumeUpFill
          onClick={() => volume < 100 && setVloume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
}

export default Player;
