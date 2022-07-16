import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { GrPlayFill, GrPauseFill, GrRefresh } from "react-icons/gr"
import { AiFillStepForward, AiFillStepBackward, AiFillSound, AiOutlineSound } from "react-icons/ai"
import { TiArrowShuffle } from "react-icons/ti"
import { BsMusicNoteList } from "react-icons/bs"

import usePlayer from "../hooks/usePlayer"
import useSpotify from "../hooks/useSpotify"
import MediaPlayer from "./MediaPlayer"
import { TrackProps } from "../types/trackList.types"
import ActiveLink from "./ActiveLink"

type Props = {}

export default function Player({ }: Props) {
  const router = useRouter()
  const { pathname } = router
  // const [pathname, setPathname] = useState<string>('')

  // useEffect(() => {
  //   setPathname(router.pathname)
  // }, [router.isReady])

  const spotifyApi = useSpotify()
  // const { data: session, status } = useSession()
  const [track, setTrack] = useState<TrackProps>()

  const {
    playerPlaylist,
    trackIndex,
    isPlaying, playPause,
    isPlayerFetching,
    volume, setVolume,
    isShuffling, setIsShuffling,
    prevTrack, nextTrack
  } = usePlayer()

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

  const handleToggleShuffle = () => {
    setIsShuffling(!isShuffling)
  }

  useEffect(() => {
    const auxTrack = playerPlaylist?.tracks[trackIndex] || false
    if (auxTrack) {
      setTrack(auxTrack)
    }
  }, [playerPlaylist, trackIndex])

  return (
    // <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
    // <div className="h-full grid grid-cols-3 bg-gradient-to-b from-black to-gray-900 text-white text-xs md:text-base px-2 md:px-8">
    <div className="h-full grid grid-cols-3 bg-zinc-900 border-t border-zinc-800 text-white text-xs md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
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