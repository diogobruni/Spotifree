import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useRouter } from 'next/router'

import { spotifyAccessTokenAtom, spotifyRefreshedtimeAtom } from "../atoms/spotifyAtom"
import { spotifyApi, spotifyRefreshToken } from "../lib/spotify"

export default function useSpotify() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useRecoilState(spotifyAccessTokenAtom)
  const [refreshedTime, setRefreshedTime] = useRecoilState(spotifyRefreshedtimeAtom)

  useEffect(() => {
    spotifyApi.setRefreshToken(process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN as string)

    const refreshTimePastInMinutes = (Date.now() - refreshedTime) / 1000 / 60

    if (
      accessToken
      && (
        refreshedTime === 0
        || refreshTimePastInMinutes < 60
      )
    ) {
      spotifyApi.setAccessToken(accessToken)
      return
    }

    spotifyApi.setAccessToken(process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN as string)

    const getAccessToken = async () => {
      try {
        const me = await spotifyApi.getMe()
      } catch (e: any) {
        if (e.statusCode === 401) {
          try {
            const newAccessToken = await spotifyRefreshToken()
            if (newAccessToken) {
              setAccessToken(newAccessToken)
              setRefreshedTime(Date.now())
              spotifyApi.setAccessToken(accessToken)
              router.reload()
            } else {
              setAccessToken('')
              setRefreshedTime(Date.now())
              // router.reload()
              router.push('/token-expired')
            }
          } catch (e) {
            setAccessToken('')
            setRefreshedTime(Date.now())
            // router.reload()
            router.push('/token-expired')
          }
        }
      }
    }

    getAccessToken()
  }, [])

  return spotifyApi
}