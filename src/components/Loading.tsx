import Image from 'next/image'
import React from 'react'

import spotifyLogo from "../../public/spotify-logo.png"

type Props = {}

export default function Loading({ }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">

      <div className="inline relative">
        <div className="absolute h-full w-full inline-flex rounded-full bg-green-500 animate-ping opacity-10 z-10"></div>
        <Image
          src={spotifyLogo}
          width={120}
          height={120}
          className="relative z-20 bg-zinc-900 rounded-full"
        />
      </div>

    </div>
  )
}