import React from 'react'
import usePlayer from '../hooks/usePlayer'
import Song from './Song'

interface PlaylistWithTracks extends SpotifyApi.SinglePlaylistResponse {
  tracks: SpotifyApi.PlaylistTrackResponse
}

type Props = {
  playlist: PlaylistWithTracks
}

export default function PlaylistSongs({ playlist }: Props) {
  const {
    setPlayerPlaylist
  } = usePlayer()

  const handleSelectPlaylist = () => {
    setPlayerPlaylist(playlist)
  }

  return (
    <div className='p-8 flex flex-col space-y-1 text-white'>
      {playlist?.tracks.items.map((track, i) => (
        <Song
          key={track.track?.id}
          playlistId={playlist.id}
          selectPlaylist={handleSelectPlaylist}
          track={track}
          order={i}
        />
      ))}
    </div>
  )
}