import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

import useSpotify from '../hooks/useSpotify';
import { homeCategoriesPlaylists } from '../atoms/playlistAtom';

import Loading from '../components/Loading';
import PlaylistCard from '../components/PlaylistCard';
import { CategoryWithPlaylistProps } from '../types/category.type';

// import { spotifyApi } from '../lib/spotify'

// interface CategoryWithPlaylistsProps extends SpotifyApi.CategoryObject {
//   playlists?: SpotifyApi.PlaylistObjectSimplified[]
// }

const Home: NextPage = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()

  // let isFetching = false
  const [isFetching, setIsFetching] = useState(false)
  // const [sectionPlaylists, setSectionPlaylists] = useState<CategoryWithPlaylistsProps[]>([])
  const [sectionPlaylists, setSectionPlaylists] = useRecoilState(homeCategoriesPlaylists)

  useEffect(() => {
    if (!spotifyApi || !spotifyApi.getAccessToken()) return
    if (sectionPlaylists.length) return
    if (isFetching) return
    setIsFetching(true)

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

        const newCategoryWithPlaylists: CategoryWithPlaylistProps = {
          id: category.id,
          name: category.name,
          playlists: playlists.items.slice(0, 6).map(playlist => ({
            id: playlist.id as string,
            name: playlist.name as string,
            images: playlist.images as any,
            description: playlist.description as string
          }))
        }

        setSectionPlaylists(prev => [
          ...prev,
          newCategoryWithPlaylists
        ])
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

          <div className="grid grid-cols-3 gap-4 xl:grid-cols-6 xl:gap-6">
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
