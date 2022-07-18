import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import useSpotify from '../../hooks/useSpotify'

import HeaderCover from '../../components/HeaderCover'
import PlaylistSongs from '../../components/PlaylistSongs'
import Loading from '../../components/Loading'
import { PlaylistProps } from '../../types/playlist.types'
import { TrackListProps, TrackProps } from '../../types/trackList.types'

type Props = {}

export default function Playlist({ }: Props) {
  const router = useRouter()
  const { id } = router.query

  const spotifyApi = useSpotify()

  /**
   * WITHOUT CACHE
   */
  // const [playlist, setPlaylist] = useRecoilState(playlistState)
  // const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>()

  // useEffect(() => {
  //   if (!id) return

  //   const spotifyGetPlaylist = async () => {
  //     setPlaylist(undefined)
  //     const data = await spotifyApi.getPlaylist(id as string)
  //     console.log(data)
  //     setPlaylist(data.body)
  //   }
  //   spotifyGetPlaylist()
  //     .catch(err => {
  //       console.log("Something went wrong: ", err)
  //     })
  // }, [id])

  /**
   * WITH CACHE
   */
  // const [playlist, getOrFetchPlaylist] = useCache<SpotifyApi.SinglePlaylistResponse | null>(null)
  const [playlist, setPlaylist] = useState<PlaylistProps>()
  const [trackList, setTrackList] = useState<TrackListProps>()

  useEffect(() => {
    if (!spotifyApi || !spotifyApi.getAccessToken()) return
    if (!id) return

    // getOrFetchPlaylist(
    //   () => (
    //     spotifyApi
    //       .getPlaylist(id as string)
    //       .then(data => data.body)
    //       .catch(err => undefined)
    //   ),
    //   id as string
    // )

    const fetchPlaylist = async () => {
      const playlist = (await spotifyApi.getPlaylist(id as string)).body
      setPlaylist({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description || undefined,
        images: playlist.images as any,
      })

      if (!playlist.tracks.items.length) return

      const auxTrackList: TrackProps[] = playlist.tracks.items.map(track => ({
        id: track.track?.id as string,
        name: track.track?.name as string,
        duration_ms: track.track?.duration_ms as number,
        album: {
          id: track.track?.album.id as any,
          name: track.track?.album.name as any,
          images: track.track?.album.images as any,
        },
        artists: track.track?.artists.map(artist => ({
          id: artist.id as string,
          name: artist.name as string
        }))
      }))

      setTrackList({
        sourceId: playlist.id,
        tracks: auxTrackList
      } as TrackListProps)
    }

    fetchPlaylist()
  }, [id, spotifyApi])

  if (!playlist)
    return <Loading />

  return (
    <main>
      {/* <PlaylistCover playlist={playlist} /> */}
      <HeaderCover
        // playlist={playlist}
        title={playlist.name}
        hat="PLAYLIST"
        description={playlist.description}
        image={playlist.images[0]}
      />

      <PlaylistSongs trackList={trackList} />
    </main>
  )
}