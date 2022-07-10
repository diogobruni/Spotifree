import React from 'react'

type Props = {}

export default function Player({ }: Props) {
  return (
    <div className="h-full flex items-center justify-center border border-white">
      <span className="text-white text-3xl font-semibold">
        Player
      </span>
    </div>
  )
}