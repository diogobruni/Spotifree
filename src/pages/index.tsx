import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GrPlayFill } from "react-icons/gr";
import { useRecoilState } from 'recoil';
import { homeCategoriesPlaylists } from '../atoms/playlistAtom';
import Loading from '../components/Loading';
import useSpotify from '../hooks/useSpotify';

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
              <Link
                href={`/playlist/${playlist.id}`}
                key={playlist.id}
              >
                <a className="p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-md transition-colors shadow-lg group">
                  <div className="relative">
                    <img
                      className="rounded-md shadow mb-4"
                      src={playlist.images[0].url}
                      width={playlist.images[0].width}
                      height={playlist.images[0].height}
                      alt={playlist.name}
                    />

                    <span className="absolute bottom-2 right-2 bg-green-500 rounded-full shadow-xl p-4 hidden group-hover:inline hover:bg-green-400 hover:scale-105 transition">
                      {/* <PlayIcon className="h-10 w-10 text-black" /> */}
                      <GrPlayFill className="h-4 w-4 text-black" />
                    </span>
                  </div>

                  <span className="text-base leading-relaxed font-bold mb-1 line-clamp-1">
                    {playlist.name}
                  </span>

                  <p className="text-sm leading-tight text-zinc-400 line-clamp-2">
                    {playlist.description}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}

    </main>
  )
}

export default Home
