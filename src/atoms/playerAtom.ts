import { atom } from "recoil"
import { TrackListProps } from "../types/trackList.types"

interface PlaylistWithTracks extends SpotifyApi.SinglePlaylistResponse {
  tracks: SpotifyApi.PlaylistTrackResponse
}

// export const playerPlaylistAtom = atom<PlaylistWithTracks>({
export const playerPlaylistAtom = atom<TrackListProps | undefined>({
  key: "playerPlaylistState",
  default: undefined,
})

export const playerTrackIndexAtom = atom<number>({
  key: "playerTrackIndexAtom",
  default: -1,
})

export const playerStateAtom = atom<number>({
  key: "playerStateAtom",
  default: -1,
})

export const playerIsFetchingAtom = atom<boolean>({
  key: "playerIsFetchingAtom",
  default: false,
})

export const playerIsPlayingAtom = atom<boolean>({
  key: "playerIsPlayingAtom",
  default: false,
})

export const playerVolumeAtom = atom<number>({
  key: "playerVolumeAtom",
  default: 50,
})