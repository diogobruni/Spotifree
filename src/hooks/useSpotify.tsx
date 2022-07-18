import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useRouter } from 'next/router'

import { spotifyAccessTokenAtom } from "../atoms/spotifyAtom"
import { spotifyApi, spotifyRefreshToken } from "../lib/spotify"

export default function useSpotify() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useRecoilState(spotifyAccessTokenAtom)

  useEffect(() => {
    spotifyApi.setRefreshToken(process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN as string)

    if (accessToken) {
      spotifyApi.setAccessToken(accessToken)
      return
    }

    spotifyApi.setAccessToken(process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN as string)

    const getAccessToken = async () => {
      try {
        const me = await spotifyApi.getMe()
      } catch (e: any) {
        if (e.statusCode === 401) {
          const newAccessToken = await spotifyRefreshToken()
          if (newAccessToken) {
            setAccessToken(newAccessToken)
            spotifyApi.setAccessToken(accessToken)
            router.reload()
          }
        }
      }
    }

    getAccessToken()
  }, [])

  return spotifyApi
}