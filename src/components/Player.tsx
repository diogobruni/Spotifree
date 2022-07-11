// https://github.com/jergra/spotify-react-next-2/blob/main/components/Player.js

import {
  HandIcon,
  VolumeUpIcon as VolumeDownIcon
} from "@heroicons/react/outline"

import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { playerPlaylistAtom, playerTrackIndexAtom } from "../atoms/playerAtom"
import useSpotify from "../hooks/useSpotify"

type Props = {}

export default function Player({ }: Props) {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()

  const [playlist, setPlaylist] = useRecoilState(playerPlaylistAtom)
  const [trackIndex, setTrackIndex] = useRecoilState(playerTrackIndexAtom)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(50)

  const { track } = playlist?.tracks?.items[trackIndex] || {}

  const handlePlayPause = () => {
    //
  }

  // if (!track) return (
  //   <div className="h-full flex items-center justify-center border border-white">
  //     <span className="text-white text-3xl font-semibold">
  //       Player
  //     </span>
  //   </div>
  // )

  return (
    // <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
    // <div className="h-full grid grid-cols-3 bg-gradient-to-b from-black to-gray-900 text-white text-xs md:text-base px-2 md:px-8">
    <div className="h-full grid grid-cols-3 bg-zinc-900 border-t border-zinc-800 text-white text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-16 w-16"
          src={track?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3 className="text-md">{track?.name}</h3>
          <p className="text-sm text-zinc-400">{track?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="h-10 w-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="h-10 w-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
        )}
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
        <ReplyIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
      </div>

      {/* right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />

        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
      </div>
    </div>
  )
}