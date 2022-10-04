import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSpotify from './useSpotify';



function useGetRecentlyPlayedTrack() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [recentlyPlayedList,setRecentlyPlayedList] = useState([])
      useEffect(() => {
        if (spotifyApi.getCredentials().accessToken) {
          spotifyApi
            .getMyRecentlyPlayedTracks()
            .then((data) => {
              deleteDuplicatedImage(data.body.items);
            })
            .catch((err) => console.log("Something went wrong!", err));
        }
      }, [spotifyApi,session]);

       const deleteDuplicatedImage = (albums: Array<any>) => {
         const newAlbumName = [];
         const newAlbum = [];
         albums.map((album) => {
           if (!newAlbumName.includes(album.track.album.name)) {
             newAlbumName.push(album.track.album.name);
             newAlbum.push(album);
           }
         });
        
         setRecentlyPlayedList(newAlbum);
       };
return recentlyPlayedList;
}

export default useGetRecentlyPlayedTrack