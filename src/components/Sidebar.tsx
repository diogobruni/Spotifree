import { HomeIcon, SearchIcon, LogoutIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"

import useSpotify from "../hooks/useSpotify"
import ActiveLink from "./ActiveLink"

export function Sidebar() {
  const spotifyApi = useSpotify()
  const [playlist, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([])

  useEffect(() => {
    if (spotifyApi && spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items)
      })
    }
  }, [spotifyApi])

  return (
    <div className="text-zinc-500 text-xs lg:text-sm border-r border-gray-900 p-5 h-full sm:max-w-[12rem] lg:max-w-[15rem]">

      <div className="space-y-4 overflow-y-scroll scrollbar-hide">
        <ActiveLink href="/" activeClassName="text-green-600 hover:text-green-500" notActiveClassName="hover:text-white">
          {/* <Link href="/"> */}
          <a className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </a>
          {/* </Link> */}
        </ActiveLink>

        <ActiveLink href="/search" activeClassName="text-green-600 hover:text-green-500" notActiveClassName="hover:text-white">
          <a className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </a>
        </ActiveLink>

        {/* <button className="flex items-center gap-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button> */}

        {/* <button
          className="flex items-center gap-2 hover:text-white"
          onClick={() => { signOut() }}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>Logout</p>
        </button> */}

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
          <ActiveLink
            key={playlist.id}
            href={`/playlist/${playlist.id}`}
            activeClassName="text-green-600 hover:text-green-500"
            notActiveClassName="hover:text-white"
          >
            <a className="flex cursor-pointer">
              {playlist.name}
            </a>
          </ActiveLink>
        ))}
      </div>
    </div>
  )
}