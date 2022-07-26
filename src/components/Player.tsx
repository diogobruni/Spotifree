import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { GrPlayFill, GrPauseFill, GrRefresh } from "react-icons/gr"
import { AiFillStepForward, AiFillStepBackward, AiFillSound, AiOutlineSound } from "react-icons/ai"
import { TiArrowShuffle } from "react-icons/ti"
import { BsMusicNoteList } from "react-icons/bs"
import { VscGithub } from "react-icons/vsc"

import usePlayer from "../hooks/usePlayer"
import MediaPlayer from "./MediaPlayer"
import { TrackProps } from "../types/trackList.types"
import ActiveLink from "./ActiveLink"
import { duration } from "../lib/time"

type Props = {}

export default function Player({ }: Props) {
  const router = useRouter()

  const [track, setTrack] = useState<TrackProps>()

  const [isPlaybackChanging, setIsPlaybackChanging] = useState(false)
  const [visibleCurrentPlayback, setVisibleCurrentPlayback] = useState<number>(0)

  const {
    playerPlaylist,
    trackIndex,
    isPlaying, playPause,
    currentPlayback, setCurrentPlayback,
    seekPlayback, setSeekPlayback,
    durationPlayback, setDurationPlayback,
    isPlayerFetching,
    volume, setVolume,
    isShuffling, setIsShuffling,
    prevTrack, nextTrack
  } = usePlayer()

  const handlePlayPause = () => {
    playPause()
  }

  const handlePrevTrack = () => {
    prevTrack()
  }

  const handleNextTrack = () => {
    nextTrack()
  }

  const handleToggleShuffle = () => {
    setIsShuffling(!isShuffling)
  }

  const handlePlaybackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const playback = parseInt(value)
    setVisibleCurrentPlayback(playback)
  }

  const handlePlaybackMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsPlaybackChanging(true)
  }

  const handlePlaybackMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsPlaybackChanging(false)
    setSeekPlayback(visibleCurrentPlayback)
  }

  useEffect(() => {
    const auxTrack = playerPlaylist?.tracks[trackIndex] || false
    if (auxTrack) {
      setTrack(auxTrack)
    }
  }, [playerPlaylist, trackIndex])

  useEffect(() => {
    if (!isPlaybackChanging) {
      setVisibleCurrentPlayback(currentPlayback)
    }
  }, [currentPlayback])

  return (
    // <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
    // <div className="h-full grid grid-cols-3 bg-gradient-to-b from-black to-gray-900 text-white text-xs md:text-base px-2 md:px-8">
    <div className="h-full grid grid-cols-3 bg-zinc-900 border-t border-zinc-800 text-white text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        <a href="https://github.com/diogobruni/Spotifree" target="_BLANK" className="flex flex-col items-center mr-4 gap-2 text-zinc-400 hover:text-white transition-colors">
          <VscGithub className="h-6 w-6" />
          <span>GitHub</span>
        </a>

        {track && track.album && (
          <img
            className="hidden md:inline h-16 w-16"
            src={track?.album?.images?.[0]?.url}
            alt={track?.album?.name}
          />
        )}
        <div>
          <h3 className="text-md">{track && track.name}</h3>
          <p className="text-sm text-zinc-400">{track && track.artists?.[0].name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-5">
          {/* <SwitchHorizontalIcon
            className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          /> */}

          <button
            className=""
            onClick={handleToggleShuffle}
          >
            <TiArrowShuffle className={`h-5 w-5 transition-colors ${isShuffling ? 'text-green-600 hover:text-green-500' : 'text-zinc-400 hover:text-white'}`} />
          </button>

          <button
            className=""
            onClick={handlePrevTrack}
          >
            <AiFillStepBackward className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
          </button>
          {/* <RewindIcon
            onClick={handlePrevTrack}
            className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          /> */}

          <button
            className="h-10 w-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition transform duration-100 ease-out"
            onClick={handlePlayPause}
          >
            {isPlaying && isPlayerFetching && (
              // <RefreshIcon className="h-10 w-10 cursor-pointer animate-spin" />
              <GrRefresh className="h-5 w-5 animate-spin" />
            )}

            {isPlaying && !isPlayerFetching && (
              // <PauseIcon className="h-10 w-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
              <GrPauseFill className="h-5 w-5" />
            )}

            {!isPlaying && (
              // <PlayIcon className="h-10 w-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
              <GrPlayFill className="h-5 w-5 translate-x-0.5" />
            )}
          </button>

          <button
            className=""
            onClick={handleNextTrack}
          >
            <AiFillStepForward className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
          </button>

          {/* <ReplyIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" /> */}

          <ActiveLink
            href="/playlist/playing"
            activeClassName="text-green-600 hover:text-green-500"
            notActiveClassName="hover:text-white"
          >
            <a className="text-zinc-400 transition-colors">
              <BsMusicNoteList className="h-4 w-4" />
            </a>
          </ActiveLink>
        </div>

        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-zinc-400">
            {duration(visibleCurrentPlayback * 1000)}
          </span>
          <input
            className="input-range"
            type="range"
            value={visibleCurrentPlayback}
            onChange={handlePlaybackChange}
            onMouseDown={handlePlaybackMouseDown}
            onMouseUp={handlePlaybackMouseUp}
            min={0}
            max={durationPlayback}
            style={{ "--input-value": `${visibleCurrentPlayback / durationPlayback * 100}%` } as React.CSSProperties}
          />
          <span className="text-xs text-zinc-400">
            {duration(durationPlayback * 1000)}
          </span>
        </div>
      </div>

      {/* right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <MediaPlayer />

        <AiOutlineSound
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="h-5 w-5 cursor-pointer text-zinc-400 hover:text-white transition-colors"
        />

        <input
          className="input-range w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
          style={{ "--input-value": `${volume}%` } as React.CSSProperties}
        />

        <AiFillSound
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="h-5 w-5 cursor-pointer text-zinc-400 hover:text-white transition-colors"
        />
      </div>
    </div>
  )
}