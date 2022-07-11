import React from 'react'
import { useRecoilState } from 'recoil'
import { playerPlaylistAtom, playerTrackIndexAtom } from '../atoms/playerAtom'
import { duration } from '../lib/time'

type Props = {
  playlistId: string
  order: number
  track: SpotifyApi.PlaylistTrackObject
  selectPlaylist: () => void
}

export default function Song({ playlistId, order, track, selectPlaylist }: Props) {
  const [playerPlaylist, setPlayerPlaylist] = useRecoilState(playerPlaylistAtom)
  const [playerTrackIndex, setPlayerTrackIndex] = useRecoilState(playerTrackIndexAtom)

  const handlePlaySong = () => {
    selectPlaylist()
    setPlayerTrackIndex(order)
  }

  const isCurrentSong = playerPlaylist?.id === playlistId && playerTrackIndex === order

  return (
    <div
      className={`grid grid-cols-2 py-4 px-5 hover:bg-zinc-900 rounded-lg cursor-pointer ${isCurrentSong ? 'text-green-500' : 'text-zinc-400'}`}
      onClick={handlePlaySong}
    >
      <div className='flex items-center space-x-4'>
        <p className='text-sm'>{order + 1}</p>

        <img
          className='h-10 w-10'
          src={track.track?.album.images[0].url}
          alt={track.track?.album.name}
        />

        <div>
          <p className={`w-36 lg:w-64 truncate text-md ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>{track.track?.name}</p>
          <p className='w-40 text-sm'>{track.track?.artists[0].name}</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline w-40 text-sm'>{track.track?.album.name}</p>
        <p className='text-sm'>{duration(track.track?.duration_ms || 0)}</p>
      </div>
    </div>
  )
}