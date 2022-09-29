import { useSession } from 'next-auth/react';
import React,{useState,useEffect} from 'react'
import useSpotify from './useSpotify';



function useRecommendationAlbum ()  {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [recommendationAlbum, setRecommendationAlbum] = useState([]);
  useEffect(() => {
    if (spotifyApi.getCredentials().accessToken) {
        spotifyApi
          .getRecommendations({
            min_energy: 0.4,
            seed_artists: ["6mfK6Q2tzLMEchAr0e9Uzu", "4DYFVNKZ1uixa6SQTvzQwJ"],
            min_popularity: 50,
          })
          .then((res) => {
            setRecommendationAlbum(res.body.tracks);
            // console.log(res);
          }); 
   
    }
  }, [spotifyApi,session]);
  // console.log(setRecommendationAlbum);
  return recommendationAlbum;
  
}

export default useRecommendationAlbum;