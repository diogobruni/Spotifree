// https://github.com/jergra/spotify-react-next-2/blob/main/components/Player.js

import {
  TrashIcon,
  VolumeUpIcon as VolumeDownIcon
} from "@heroicons/react/outline"

import {
  VolumeUpIcon,
} from "@heroicons/react/solid"

import { GrPlayFill, GrPauseFill, GrRefresh } from "react-icons/gr"
import { AiFillStepForward, AiFillStepBackward, AiFillSound, AiOutlineSound } from "react-icons/ai"
import { useSession } from "next-auth/react"
import usePlayer from "../hooks/usePlayer"
import useSpotify from "../hooks/useSpotify"
import MediaPlayer from "./MediaPlayer"

type Props = {}

export default function Player({ }: Props) {
  const spotifyApi = useSpotify()
  // const { data: session, status } = useSession()

  const {
    playerPlaylist,
    trackIndex,
    isPlaying, playPause,
    isPlayerFetching,
    volume, setVolume,
    prevTrack, nextTrack
  } = usePlayer()

  const { track } = playerPlaylist?.tracks?.items[trackIndex] || {}

  const handlePlayPause = () => {
    // setIsPlaying(!isPlaying)
    playPause()
  }

  const handlePrevTrack = () => {
    prevTrack()
  }

  const handleNextTrack = () => {
    nextTrack()
  }

  return (
    // <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
    // <div className="h-full grid grid-cols-3 bg-gradient-to-b from-black to-gray-900 text-white text-xs md:text-base px-2 md:px-8">
    <div className="h-full grid grid-cols-3 bg-zinc-900 border-t border-zinc-800 text-white text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        {track?.album && (
          <img
            className="hidden md:inline h-16 w-16"
            src={track?.album?.images?.[0]?.url}
            alt={track?.album?.name}
          />
        )}
        <div>
          <h3 className="text-md">{track?.name}</h3>
          <p className="text-sm text-zinc-400">{track?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-center gap-5">
        {/* <SwitchHorizontalIcon
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        /> */}

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
      </div>

      {/* right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <MediaPlayer />

        <AiOutlineSound
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="h-5 w-5 cursor-pointer text-zinc-400 hover:text-white transition-colors"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />

        <AiFillSound
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="h-5 w-5 cursor-pointer text-zinc-400 hover:text-white transition-colors"
        />
      </div>
    </div>
  )
}