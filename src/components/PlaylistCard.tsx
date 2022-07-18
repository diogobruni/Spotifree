import Link from 'next/link'
import React from 'react'
import { GrPlayFill } from 'react-icons/gr'
import { PlaylistProps } from '../types/playlist.types'

type Props = {
  playlist: PlaylistProps
}

export default function PlaylistCard({ playlist }: Props) {
  if (!playlist?.images?.[0]?.url) return <></>
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      key={playlist.id}
    >
      <a className="p-4 bg-zinc-800/50 hover:bg-zinc-800 rounded-md transition-colors shadow-lg group">
        <div className="relative">
          <img
            className="rounded-md shadow mb-4"
            src={playlist?.images?.[0]?.url}
            width={playlist?.images?.[0]?.width}
            height={playlist?.images?.[0]?.height}
            alt={playlist?.name}
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
  )
}