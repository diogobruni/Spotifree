import React from 'react'
import usePlayer from '../hooks/usePlayer'
import { duration } from '../lib/time'
import { TrackProps } from '../types/trackList.types'

type Props = {
  trackListSourceId: string
  order: number
  track: TrackProps
  selectPlaylist: () => void
}

export default function SongSlim({ trackListSourceId, order, track, selectPlaylist }: Props) {
  const {
    playerPlaylist, setPlayerPlaylist,
    trackIndex, setTrackIndex,
    play
  } = usePlayer()

  const handlePlaySong = () => {
    if (trackIndex === order) return

    selectPlaylist()
    setTrackIndex(order)
    play()
  }

  const isCurrentSong = playerPlaylist?.sourceId === trackListSourceId && trackIndex === order

  if (
    !track
    || !track?.name
  ) return <></>

  return (
    <div
      className={`grid grid-cols-2 py-1 px-3 hover:bg-zinc-900 rounded-lg cursor-pointer ${isCurrentSong ? 'text-green-500' : 'text-zinc-400'}`}
      onClick={handlePlaySong}
    >
      <div className='flex items-center space-x-4'>
        <p className='text-sm'>{order + 1}</p>

        <div>
          <p className={`w-36 lg:w-64 truncate text-sm ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>{track?.name}</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline w-40 text-sm truncate'>{track.album?.name}</p>
        <p className='text-sm'>{duration(track.duration_ms || 0)}</p>
      </div>
    </div>
  )
}