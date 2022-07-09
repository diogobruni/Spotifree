import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { spotifyApi } from "../lib/spotify"

// import SpotifyWebApi from "spotify-web-api-node"
// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
// })

interface SessionUserProps {
  name: string
  email: string
  image: string
  accessToken: string
  refreshToken: string
}

export default function useSpotify() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }

      const user = session.user as SessionUserProps
      spotifyApi.setAccessToken(user.accessToken)
    }
  }, [session])

  return spotifyApi
}