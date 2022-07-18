import { atom } from "recoil"
import { TrackListProps } from "../types/trackList.types"
import { YouTubePlayer } from "react-youtube"

interface localStorageEffectProps {
  setSelf: (arg0: string) => void
  onSet: (arg0: any) => void
}

const localStorageEffect: any = (key: string) => ({ setSelf, onSet }: localStorageEffectProps): void => {
  if (typeof localStorage === 'undefined') return

  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }

  onSet((newValue: any, _: any, isReset: any) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue))
  })
}

export const playerPlaylistAtom = atom<TrackListProps | undefined>({
  key: "playerPlaylistState",
  default: undefined,
  effects: [
    localStorageEffect("playerPlaylistState"),
  ]
})

export const playerTrackIndexAtom = atom<number>({
  key: "playerTrackIndexAtom",
  default: -1,
  effects: [
    localStorageEffect("playerTrackIndexAtom"),
  ]
})

export const playerTrackIndexHistoryAtom = atom<number[]>({
  key: "playerTrackIndexHistoryAtom",
  default: undefined,
  effects: [
    localStorageEffect("playerTrackIndexHistoryAtom"),
  ]
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
  effects: [
    localStorageEffect("playerVolumeAtom"),
  ]
})

export const playerShuffleAtom = atom<boolean>({
  key: "playerShuffleAtom",
  default: false,
  effects: [
    localStorageEffect("playerShuffleAtom"),
  ]
})

export const playerSeekPlaybackAtom = atom<number>({
  key: "playerSeekPlaybackAtom",
  default: 0,
})

export const playerCurrentPlaybackAtom = atom<number>({
  key: "playerCurrentPlaybackAtom",
  default: 0,
})

export const playerDurationPlaybackAtom = atom<number>({
  key: "playerDurationPlaybackAtom",
  default: 0,
})