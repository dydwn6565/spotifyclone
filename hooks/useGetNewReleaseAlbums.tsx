import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import useSpotify from "./useSpotify";

function useGetNewReleaseAlbums() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
  useEffect(() => {
    if (spotifyApi.getCredentials().accessToken) {
      spotifyApi
        .getNewReleases()
        .then((data) => {
          fetch(data.body.albums.href, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${
                spotifyApi.getCredentials().accessToken
              }`,
            },
          })
            .then((re) => {
              return re.json();
            })
            .then((result) => {
              
              setNewReleaseAlbums(result);
            });
        })
        .catch((err) => console.log("Something went wrong!", err));
    }
  }, [spotifyApi,session]);

  return newReleaseAlbums;
}

export default useGetNewReleaseAlbums;
