import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

export default function FloatingUserBar({ }: Props) {
  const { data: session } = useSession()

  if (!session) return <></>

  return (
    <header className="absolute top-5 right-8">
      <div className="flex items-center gap-3 bg-black text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 relative z-50">
        <img
          className="rounded-full w-10 h-10"
          src={session?.user?.image as string}
          alt="Your profile picture"
          width={40}
          height={40}
        />

        <h2>{session?.user?.name}</h2>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </header>
  )
}