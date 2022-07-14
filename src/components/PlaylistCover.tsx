import { useEffect, useState } from "react"
import { PlaylistProps } from "../types/playlist.types"

interface PlaylistCoverProps {
  playlist: PlaylistProps
}

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
]

export default function PlaylistCover({ playlist }: PlaylistCoverProps) {
  const [color, setColor] = useState<string>('')

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }, [playlist])

  return (
    <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}>
      <img
        className="w-56 h-56 shadow-2xl"
        src={playlist?.images?.[0]?.url}
        alt=""
      />

      <div>
        <p className="text-xs font-bold">PLAYLIST</p>
        <h1 className="text-xl md:text-3xl xl:text-8xl font-bold leading-relaxed">
          {playlist?.name}
        </h1>

        {playlist?.description && (
          <p className="mt-4 text-zinc-400">{playlist.description}</p>
        )}
      </div>
    </section>
  )
}