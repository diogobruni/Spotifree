import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { spotifyApi, LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }

  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt(props) {
      const { token }: { token: any } = props
      const { account, user } = props


      // initial sign in
      if (account && user) {
        console.log(account.access_token)

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at as number * 1000,
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Refresh the access token if it has expired
      return await refreshAccessToken(token)
    },

    async session({ session, token }: { session: any, token: any }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    }
  }
})