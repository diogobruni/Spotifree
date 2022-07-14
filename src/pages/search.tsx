import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce'

import useSpotify from '../hooks/useSpotify';

import Loading from '../components/Loading';
import PlaylistCard from '../components/PlaylistCard';
import Song from '../components/Song';
import usePlayer from '../hooks/usePlayer';
import { ArtistProps } from '../types/artist.types';
import { TrackListProps, TrackProps } from '../types/trackList.types';
import { PlaylistProps } from '../types/playlist.types';
import SongSlim from '../components/SongSlim';

const Search: NextPage = () => {
  const spotifyApi = useSpotify()

  const {
    setPlayerPlaylist
  } = usePlayer()

  const [isFetching, setIsFetching] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)

  const [resultArtist, setResultArtist] = useState<ArtistProps>()
  const [resultArtistTrackList, setResultArtistTrackList] = useState<TrackListProps>()

  const [resultTracks, setResultTracks] = useState<TrackListProps>()

  const [resultPlaylists, setResultPlaylists] = useState<PlaylistProps[]>([])

  const searchArtist = async () => {
    const { artists } = (await spotifyApi.searchArtists(debouncedQuery)).body

    if (!artists?.items?.length) {
      setResultArtist(undefined)
      setResultArtistTrackList(undefined)
      return
    }

    console.log(artists.items[0])
    setResultArtist({
      id: artists.items[0].id,
      name: artists.items[0].name,
      images: artists.items[0].images as any
    })

    const { tracks } = (await spotifyApi.getArtistTopTracks(artists.items[0].id, 'US')).body
    if (!tracks.length) return

    const auxTrackList: TrackProps[] = tracks.map(track => ({
      id: track?.id as string,
      name: track?.name as string,
      duration_ms: track?.duration_ms as number,
      album: {
        id: track?.album.id as any,
        name: track?.album.name as any,
        images: track?.album.images as any,
      },
      artists: track?.artists.map(artist => ({
        id: artist.id as string,
        name: artist.name as string
      }))
    }))

    setResultArtistTrackList({
      sourceId: `artist_${artists.items[0].id}`,
      tracks: auxTrackList
    } as TrackListProps)
  }

  const searchTracks = async () => {
    const { tracks } = (await spotifyApi.searchTracks(debouncedQuery)).body

    if (!tracks?.items.length) {
      setResultTracks([])
      return
    }

    setResultTracks(tracks.items)
  }

  const searchPlaylists = async () => {
    const { playlists } = (await spotifyApi.searchPlaylists(debouncedQuery)).body

    if (!playlists?.items.length) {
      setResultPlaylists([])
      return
    }

    setResultPlaylists(playlists.items)
  }

  useEffect(() => {
    if (!debouncedQuery) return

    searchArtist()
    searchTracks()
    searchPlaylists()
  }, [debouncedQuery])

  return (
    <main className="p-8 space-y-12">

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="">
          <input
            className="w-full px-4 py-2 rounded-full text-sm text-zinc-900 outline-none focus:ring ring-green-500"
            type="text"
            placeholder="Search"
            onChange={(e) => { setQuery(e.target.value) }}
            autoFocus
          />
        </div>
      </form>

      {resultArtist && (
        <div>
          <h2 className='text-3xl mb-4'>Artist</h2>
          <div className="flex gap-4 group">
            <div className="flex flex-col gap-4 items-center justify-center p-8 rounded-lg shadow-lg cursor-pointer bg-zinc-900 group-hover:bg-zinc-800/80 transition-colors">
              <img
                className="rounded-full"
                src={resultArtist?.images?.[0].url}
                alt={resultArtist?.name}
                width={92}
                height={92}
              />

              <h3 className="text-xl font-bold">{resultArtist?.name}</h3>
            </div>

            <div className='flex-1 flex flex-col space-y-1 p-2 rounded-lg shadow-lg text-white bg-zinc-900 group-hover:bg-zinc-800/80 transition-colors'>
              {resultArtistTrackList?.tracks.map((track, i) => (
                <SongSlim
                  key={track.id}
                  trackListSourceId={resultArtistTrackList.sourceId}
                  selectPlaylist={() => { setPlayerPlaylist(resultArtistTrackList) }}
                  track={track}
                  order={i}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default Search
