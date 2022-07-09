import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

export default function FloatingUserBar({ }: Props) {
  const { data: session } = useSession()

  return (
    <header className="absolute top-5 right-8">
      <div className="flex items-center bg-black text-white gap-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
        <img
          className="rounded-full w-10 h-10"
          src={session?.user?.image as string}
          alt=""
        />
        <h2>{session?.user?.name}</h2>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </header>
  )
}