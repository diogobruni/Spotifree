import React from 'react'
import { useRecoilState } from 'recoil'
import { playerPlaylistAtom } from '../atoms/playerAtom'
import Song from './Song'

interface PlaylistWithTracks extends SpotifyApi.SinglePlaylistResponse {
  tracks: SpotifyApi.PlaylistTrackResponse
}

type Props = {
  playlist: PlaylistWithTracks
}

export default function PlaylistSongs({ playlist }: Props) {
  const [playerPlaylist, setPlayerPlaylist] = useRecoilState(playerPlaylistAtom)

  const handleSelectPlaylist = () => {
    // setPlayerPlaylist(playlist?.tracks.items)
    setPlayerPlaylist(playlist)
  }

  return (
    <div className='p-8 flex flex-col space-y-1 text-white'>
      {playlist?.tracks.items.map((track, i) => (
        <Song
          key={track.track?.id}
          selectPlaylist={handleSelectPlaylist}
          track={track}
          order={i}
        />
      ))}
    </div>
  )
}