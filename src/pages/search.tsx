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
import slugify from 'slugify';

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

  const searchArtist = async (): Promise<{ artist: boolean, artistTrackList: boolean }> => {
    const { artists } = (await spotifyApi.searchArtists(debouncedQuery)).body

    if (!artists?.items?.length) {
      setResultArtist(undefined)
      setResultArtistTrackList(undefined)
      return {
        artist: false,
        artistTrackList: false
      }
    }

    setResultArtist({
      id: artists.items[0].id,
      name: artists.items[0].name,
      images: artists.items[0].images as any
    })

    const { tracks } = (await spotifyApi.getArtistTopTracks(artists.items[0].id, 'US')).body
    if (!tracks.length) {
      setResultArtistTrackList(undefined)
      return {
        artist: true,
        artistTrackList: false
      }
    }

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

    return {
      artist: true,
      artistTrackList: true
    }
  }

  const searchTracks = async (): Promise<{ trackList: boolean }> => {
    const { tracks } = (await spotifyApi.searchTracks(debouncedQuery)).body

    if (!tracks?.items.length) {
      setResultTracks(undefined)
      return {
        trackList: false
      }
    }

    const auxTrackList: TrackProps[] = tracks.items.slice(0, 10).map(track => ({
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

    setResultTracks({
      sourceId: `trackList_${slugify(debouncedQuery)}`,
      tracks: auxTrackList
    } as TrackListProps)

    return {
      trackList: true
    }
  }

  const searchPlaylists = async (): Promise<{ playlists: boolean }> => {
    const { playlists } = (await spotifyApi.searchPlaylists(debouncedQuery)).body

    if (!playlists?.items.length) {
      setResultPlaylists([])
      return {
        playlists: false
      }
    }

    const auxPlaylists: PlaylistProps[] = playlists.items.slice(0, 6).map(playlist => ({
      id: playlist?.id as string,
      name: playlist?.name as string,
      images: playlist?.images as any,
      description: playlist?.description as string,
    }))

    setResultPlaylists(auxPlaylists)

    return {
      playlists: true
    }
  }

  useEffect(() => {
    if (!debouncedQuery) {
      setIsFetching(false)
      return
    }

    setIsFetching(true)

    searchArtist().then((data) => { setIsFetching(false) })
    searchTracks().then((data) => { setIsFetching(false) })
    searchPlaylists().then((data) => { setIsFetching(false) })
  }, [debouncedQuery])

  return (
    <main className="p-8 space-y-12 flex flex-col min-h-full">

      <form onSubmit={(e) => e.preventDefault()} className="">
        <div className="">
          <input
            className="w-full px-8 py-4 rounded-full text-lg font-semibold text-zinc-900 outline-none focus:ring ring-green-500"
            type="text"
            placeholder="Search"
            onChange={(e) => { setQuery(e.target.value) }}
            autoFocus
          />
        </div>
      </form>

      {!isFetching && (
        <div className="flex-1">
          <Loading />
        </div>
      )}

      {!isFetching && resultArtist && resultArtistTrackList?.tracks.length && (
        <div>
          <h2 className='text-3xl mb-4'>Artist search result</h2>
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
                  key={`resultArtistTrackList_${track.id}`}
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

      {!isFetching && resultTracks?.tracks.length && (
        <div>
          <h2 className='text-3xl mb-4'>Tracks search results</h2>
          <div className="group">
            <div className='flex-1 flex flex-col space-y-1 p-2 rounded-lg shadow-lg text-white bg-zinc-900 group-hover:bg-zinc-800/80 transition-colors'>
              {resultTracks?.tracks.map((track, i) => (
                <Song
                  key={`resultTracks_${track.id}`}
                  trackListSourceId={resultTracks.sourceId}
                  selectPlaylist={() => { setPlayerPlaylist(resultTracks) }}
                  track={track}
                  order={i}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!isFetching && resultPlaylists?.length > 0 && (
        <div>
          <h2 className='text-3xl mb-4'>Playlists search results</h2>
          <div className="group">
            <div className="grid grid-cols-3 gap-4 xl:grid-cols-6 xl:gap-6">
              {resultPlaylists?.map(playlist => (
                <PlaylistCard key={`resultPlaylists_${playlist.id}`} playlist={playlist} />
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default Search
