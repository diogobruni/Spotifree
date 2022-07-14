import React from 'react'
import usePlayer from '../hooks/usePlayer'
import { PlaylistProps } from '../types/playlist.types'
import { TrackListProps } from '../types/trackList.types'
import Song from './Song'

type Props = {
  trackList: TrackListProps | undefined
}

export default function PlaylistSongs({ trackList }: Props) {
  const {
    setPlayerPlaylist
  } = usePlayer()

  const handleSelectPlaylist = () => {
    setPlayerPlaylist(trackList)
  }

  if (!trackList) return <>Lista vazia</>

  return (
    <div className='p-8 flex flex-col space-y-1 text-white'>
      {trackList?.tracks.map((track, i) => (
        <Song
          key={track.id}
          trackListSourceId={trackList.sourceId}
          selectPlaylist={handleSelectPlaylist}
          track={track}
          order={i}
        />
      ))}
    </div>
  )
}