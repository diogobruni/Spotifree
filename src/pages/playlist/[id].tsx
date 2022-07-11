import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Loading from '../../components/Loading'

// import { useRecoilState, useRecoilValue } from 'recoil'
// import { playlistIdState, playlistState } from '../../atoms/playlistAtom'

import { PlaylistCover } from '../../components/PlaylistCover'
import { useCache } from '../../hooks/useCache'
import useSpotify from '../../hooks/useSpotify'
// import { spotifyApi } from '../../lib/spotify'

type Props = {}

export default function Playlist({ }: Props) {
  const router = useRouter()
  const { id } = router.query

  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()

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
  const [playlist, getOrFetchPlaylist] = useCache<SpotifyApi.SinglePlaylistResponse | null>(null)

  useEffect(() => {
    if (!spotifyApi || !spotifyApi.getAccessToken()) return
    if (!id) return

    getOrFetchPlaylist(
      () => (
        spotifyApi
          .getPlaylist(id as string)
          .then(data => data.body)
          .catch(err => undefined)
      ),
      id as string
    )
  }, [id, session, spotifyApi])

  if (!playlist)
    return <Loading />

  return (
    <main>
      <PlaylistCover playlist={playlist} />
    </main>
  )
}