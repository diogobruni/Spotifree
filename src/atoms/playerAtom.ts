import { atom } from "recoil"

interface PlaylistWithTracks extends SpotifyApi.SinglePlaylistResponse {
  tracks: SpotifyApi.PlaylistTrackResponse
}

export const playerPlaylistAtom = atom<PlaylistWithTracks>({
  key: "playerPlaylistState",
  default: undefined,
})

export const playerTrackIndexAtom = atom<number>({
  key: "playerTrackIndexAtom",
  default: 0,
})