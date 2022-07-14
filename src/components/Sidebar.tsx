import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon, LogoutIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import useSpotify from "../hooks/useSpotify"
import Link from "next/link"

// interface PlaylistProps {
//   id: string
//   name: string
//   href: string
//   images: [{
//     url: string
//     width: number
//     height: number,
//   }]
//   tracks: {
//     href: string
//     total: number
//   }
// }

export function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlist, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([])

  useEffect(() => {
    if (spotifyApi && spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div className="text-gray-500 text-xs lg:text-sm border-r border-gray-900 p-5 h-full sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">

      <div className="space-y-4 overflow-y-scroll scrollbar-hide">
        <Link href="/">
          <a className="flex items-center gap-2 hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </a>
        </Link>

        <Link href="/search">
          <a className="flex items-center gap-2 hover:text-white">
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </a>
        </Link>

        {/* <button className="flex items-center gap-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button> */}

        <button
          className="flex items-center gap-2 hover:text-white"
          onClick={() => { signOut() }}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* <button className="flex items-center gap-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>

        <button className="flex items-center gap-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>

        <button className="flex items-center gap-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" /> */}

        {/* Playlists... */}
        {playlist.map(playlist => (
          <Link
            key={playlist.id}
            href={`/playlist/${playlist.id}`}
          >
            <a className="flex cursor-pointer hover:text-white">
              {playlist.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}