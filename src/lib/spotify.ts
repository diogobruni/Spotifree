import SpotifyWebApi from "spotify-web-api-node"

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  // "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(',')

const params = {
  scope: scopes
}

const queryParamsString = new URLSearchParams(params)
export const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamsString.toString()

export const spotifyApi = new SpotifyWebApi({
  // accessToken: process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN,
  // refreshToken: process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
})

export const spotifyRefreshToken = async (): Promise<string> => {
  try {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN as string
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      body: new URLSearchParams(data)
    })

    if (response.status === 200) {
      const json = await response.json()
      return json.access_token
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}