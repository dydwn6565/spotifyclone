
import React,{useEffect,useState} from 'react'
import useSpotify from './useSpotify';
import { useSession } from 'next-auth/react';

function useGetFeaturedAlbum() {
     const spotifyApi = useSpotify ();
  const { data: session, status } = useSession();
  const [feacturedAlbum, setFeacturedAlbum]:any = useState([]);
  useEffect(() => {
    if (spotifyApi.getCredentials().accessToken) {
        spotifyApi
          .getFeaturedPlaylists()
          .then((res) => {
            // console.log(res.body.playlists);
            setFeacturedAlbum(res.body);
            // setOldAlbum();
            
          }).catch((err) => console.log("Something went wrong!", err));; 
   
    }
  }, [spotifyApi,session]);
  
  return feacturedAlbum;
}

export default useGetFeaturedAlbum

