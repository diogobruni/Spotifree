import { useEffect, useState } from "react"
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube"
import { toast } from 'react-toastify'

import usePlayer from "../hooks/usePlayer"

interface YoutubeTrack {
  id: string
  url: string
}

type Props = {
}

export default function MediaPlayer({ }: Props) {
  const [youtubeTrack, setYoutubeTrack] = useState<YoutubeTrack>()

  // Player controls
  const [player, setPlayer] = useState<YouTubePlayer>()

  const {
    playerState, setPlayerState,
    playerPlaylist, setPlayerPlaylist,
    trackIndex, setTrackIndex,
    isPlaying, setIsPlaying,
    isPlayerFetching, setIsPlayerFetching,
    volume, setVolume,
    prevTrack, nextTrack
  } = usePlayer()

  useEffect(() => {
    const track = playerPlaylist?.tracks[trackIndex] || false
    if (!track) return

    const getMediaTrack = async () => {
      if (!track?.name) {
        nextTrack()
        return
      }

      const query = `${track?.artists?.[0]?.name} - ${track?.name}`
      const response = await fetch(`/api/youtube/search-v2?query=${query}`)
      const mediaData = await response.json()

      if (mediaData) {
        setYoutubeTrack(mediaData)
      }
    }
    getMediaTrack()
  }, [trackIndex])

  useEffect(() => {
    if (!player || !player.i) return

    if (isPlaying) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!player || !player.i || isNaN(volume)) return

    player.setVolume(volume)
  }, [volume])

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    console.log(event)
    if (!event.target.playerInfo.duration) {
      toast.error('Skipping unavailable song')
      nextTrack()
    }

    setPlayer(event.target)

    if (isPlaying) {
      event.target.playVideo()
    }
    event.target.setVolume(volume)
  }

  const handlePlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (!player || !player.i) return

    setPlayerState(player.getPlayerState())
    switch (player.getPlayerState()) {
      case -1:
        // Not started yet
        if (isPlaying) player.playVideo()
        break
      case 0:
        // Finished
        nextTrack()
        break
      case 1:
        // Playing
        setIsPlayerFetching(false)
        break
      case 2:
        // Paused
        break
      case 3:
        // Buffering
        break
      case 5:
        // Recommended video
        if (isPlaying) player.playVideo()
        break
    }
  }

  const opts: YouTubeProps['opts'] = {
    width: '142px',
    height: '80px',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      // controls: 0,
    },
  }

  if (!youtubeTrack?.id) return <></>

  return (
    <div className="relative">
      <div className="absolute inset-0 z-50"></div>
      <YouTube
        // ref={player}
        videoId={youtubeTrack?.id}
        opts={opts}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onReady={handlePlayerReady}
        onStateChange={handlePlayerStateChange}
      // onError={(e) => { console.log('Error: ', e) }}
      // onEnd={(e) => { console.log('End video: ', e) }}
      />
    </div>
  )
}