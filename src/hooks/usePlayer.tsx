import { useRecoilState } from "recoil"

import { playerIsFetchingAtom, playerIsPlayingAtom, playerPlaylistAtom, playerStateAtom, playerTrackIndexAtom, playerVolumeAtom } from "../atoms/playerAtom"

export default function usePlayer() {
  const [playerPlaylist, setPlayerPlaylist] = useRecoilState(playerPlaylistAtom)
  const [trackIndex, setTrackIndex] = useRecoilState(playerTrackIndexAtom)

  // Player controls
  const [playerState, setPlayerState] = useRecoilState(playerStateAtom)
  const [isPlayerFetching, setIsPlayerFetching] = useRecoilState(playerIsFetchingAtom)
  const [isPlaying, setIsPlaying] = useRecoilState(playerIsPlayingAtom)
  const [volume, setVolume] = useRecoilState(playerVolumeAtom)

  const play = () => {
    // if (!playerPlaylist?.tracks?.items?.length || trackIndex >= 0) return

    setIsPlayerFetching(true)
    setIsPlaying(true)
  }

  const pause = () => {
    setIsPlaying(false)
  }

  const playPause = () => {
    // if (!playerPlaylist?.tracks?.items?.length || trackIndex < 0) return
    setIsPlaying(!isPlaying)
  }

  const prevTrack = () => {
    if (!playerPlaylist?.tracks?.items?.length) return

    const prevIndex = Math.max(trackIndex - 1, 0)
    if (prevIndex !== trackIndex) {
      setIsPlayerFetching(true)
      setTrackIndex(prevIndex)
    }
  }

  const nextTrack = () => {
    if (!playerPlaylist?.tracks?.items?.length) return

    const lastIndex = playerPlaylist.tracks.items.length - 1
    const nextIndex = Math.min(trackIndex + 1, lastIndex)
    if (nextIndex !== trackIndex) {
      setIsPlayerFetching(true)
      setTrackIndex(nextIndex)
    }
  }

  return {
    playerState, setPlayerState,
    isPlaying, setIsPlaying,
    isPlayerFetching, setIsPlayerFetching,
    play, pause, playPause,
    volume, setVolume,
    playerPlaylist, setPlayerPlaylist,
    trackIndex, setTrackIndex,
    prevTrack, nextTrack,
  }
}
