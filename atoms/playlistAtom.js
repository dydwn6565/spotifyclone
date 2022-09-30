import {atom} from "recoil";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "1MK3shaTRt8jyKm0VvOo5u",
});


export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: null,
});


export const selectedPlaylists = atom({
  key: "selectedPlaylist",
  default: null,
});
