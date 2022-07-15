import { useEffect, useState } from "react"
import { ImageProps } from "../types/image.types"

interface PlaylistCoverProps {
  title: string
  hat?: string
  description?: string
  image: ImageProps
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

export default function HeaderCover({ title, hat, description, image }: PlaylistCoverProps) {
  const [color, setColor] = useState<string>('')

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }, [title])

  return (
    <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}>
      <img
        className="w-56 h-56 shadow-2xl"
        src={image?.url || ''}
        width={image?.width || 220}
        height={image?.height || 220}
        alt={title}
      />

      <div>
        {hat && (
          <p className="text-xs font-bold">{hat}</p>
        )}
        <h1 className="text-xl md:text-3xl xl:text-8xl font-bold leading-relaxed">
          {title}
        </h1>

        {description && (
          <p className="mt-4 text-zinc-400">{description}</p>
        )}
      </div>
    </section>
  )
}