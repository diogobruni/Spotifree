import { useEffect } from "react"
import { useRecoilState } from "recoil"

import { playerIsFetchingAtom, playerIsPlayingAtom, playerPlaylistAtom, playerShuffleAtom, playerStateAtom, playerTrackIndexAtom, playerTrackIndexHistoryAtom, playerVolumeAtom } from "../atoms/playerAtom"

const randomBetweenNonRepeat = (min: number, max: number, exclude: number) => {
  let random = Math.floor(Math.random() * (max - min + 1)) + min
  if (random === exclude) {
    random = randomBetweenNonRepeat(min, max, exclude)
  }
  return random
}

export default function usePlayer() {
  const [playerPlaylist, setPlayerPlaylist] = useRecoilState(playerPlaylistAtom)
  const [trackIndex, setTrackIndex] = useRecoilState(playerTrackIndexAtom)
  const [trackIndexHistory, setTrackIndexHistory] = useRecoilState(playerTrackIndexHistoryAtom)

  // Player controls
  const [playerState, setPlayerState] = useRecoilState(playerStateAtom)
  const [isPlayerFetching, setIsPlayerFetching] = useRecoilState(playerIsFetchingAtom)
  const [isPlaying, setIsPlaying] = useRecoilState(playerIsPlayingAtom)
  const [volume, setVolume] = useRecoilState(playerVolumeAtom)
  const [isShuffling, setIsShuffling] = useRecoilState(playerShuffleAtom)

  const play = () => {
    // if (!playerPlaylist?.tracks?.items?.length || trackIndex >= 0) return

    setIsPlayerFetching(true)
    setIsPlaying(true)
  }

  const pause = () => {
    setIsPlaying(false)
  }

  const playPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const prevTrack = () => {
    if (!playerPlaylist?.tracks?.length) return

    if (isShuffling && trackIndexHistory.length) {
      setTrackIndex(trackIndexHistory[trackIndexHistory.length - 1])
      setTrackIndexHistory(trackIndexHistory.slice(0, trackIndexHistory.length - 1))
      return
    }

    const prevIndex = Math.max(trackIndex - 1, 0)
    if (prevIndex !== trackIndex) {
      setIsPlayerFetching(true)
      setTrackIndex(prevIndex)
    }
    return
  }

  const nextTrack = () => {
    if (!playerPlaylist?.tracks?.length) return

    const lastIndex = playerPlaylist.tracks.length - 1
    const nextIndex = isShuffling
      ? randomBetweenNonRepeat(0, lastIndex, trackIndex)
      : Math.min(trackIndex + 1, lastIndex)

    if (nextIndex !== trackIndex) {
      setIsPlayerFetching(true)
      setTrackIndex(nextIndex)
      setTrackIndexHistory([
        ...trackIndexHistory,
        trackIndex
      ])
    }
  }

  useEffect(() => {
    if (!playerPlaylist?.tracks?.length) return

    setTrackIndexHistory([trackIndex])
  }, [playerPlaylist])

  return {
    playerState, setPlayerState,
    isPlaying, setIsPlaying,
    isPlayerFetching, setIsPlayerFetching,
    play, pause, playPause,
    volume, setVolume,
    isShuffling, setIsShuffling,
    playerPlaylist, setPlayerPlaylist,
    trackIndex, setTrackIndex,
    prevTrack, nextTrack,
  }
}
