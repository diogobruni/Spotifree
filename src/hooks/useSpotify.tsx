import { useEffect } from "react"
import { spotifyApi } from "../lib/spotify"

export default function useSpotify() {
  useEffect(() => {
    spotifyApi.setAccessToken(process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN as string)
  }, [])

  return spotifyApi
}