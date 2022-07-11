import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react'
import { useRecoilState } from 'recoil';

import useSpotify from '../hooks/useSpotify';
import { homeCategoriesPlaylists } from '../atoms/playlistAtom';

import Loading from '../components/Loading';
import PlaylistCard from '../components/PlaylistCard';

// import { spotifyApi } from '../lib/spotify'

// interface CategoryWithPlaylistsProps extends SpotifyApi.CategoryObject {
//   playlists?: SpotifyApi.PlaylistObjectSimplified[]
// }

const Home: NextPage = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()

  let isFetching = false
  // const [sectionPlaylists, setSectionPlaylists] = useState<CategoryWithPlaylistsProps[]>([])
  const [sectionPlaylists, setSectionPlaylists] = useRecoilState(homeCategoriesPlaylists)

  useEffect(() => {
    if (!spotifyApi || !spotifyApi.getAccessToken()) return
    if (isFetching) return
    if (sectionPlaylists.length) return
    isFetching = true

    const getCategories = async () => {
      const { categories } = (await spotifyApi.getCategories({
        limit: 5,
        offset: 0,
        country: 'US',
        locale: 'en_US'
      })).body

      for (let category of categories.items) {
        const { playlists } = (await spotifyApi.getPlaylistsForCategory(category.id, {
          country: 'US',
          limit: 8,
          offset: 0
        })).body

        setSectionPlaylists(prev =>
          [
            ...prev,
            {
              ...category,
              playlists: playlists.items
            }
          ]
        )
      }
    }

    getCategories()
  }, [session, spotifyApi])

  if (!sectionPlaylists.length)
    return <Loading />

  return (
    <main className="p-8 space-y-12">

      {sectionPlaylists.map(({ id, name, playlists }) => (
        <div key={id}>
          <h2 className="text-2xl font-semibold mb-5">{name}</h2>

          <div className="grid grid-cols-8 gap-8">
            {playlists?.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      ))}

    </main>
  )
}

export default Home
