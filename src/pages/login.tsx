import { getProviders, signIn, useSession } from "next-auth/react"
import { Provider } from "next-auth/providers"
import Image from "next/image"

import spotifyLogo from "../../public/spotify-logo.png"
import { useEffect, useState } from "react"

interface LoginProps {
  providers: Provider[]
}

interface SessionUserProps {
  name: string
  email: string
  image: string
  accessToken: string
  refreshToken: string
}

export default function Login({ providers }: LoginProps) {
  const { data: session, status } = useSession()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setrefreshToken] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }

      const user = session.user as SessionUserProps
      setAccessToken(user?.accessToken)
      setrefreshToken(user?.refreshToken)
    }
  }, [session])

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <div className="mb-5">
        <Image
          className=""
          src={spotifyLogo}
          alt="Spotify"
          width={208}
          height={208}
        />
      </div>

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: '/login' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}

      {accessToken && (
        <div className="w-1/2 mx-auto mt-12">

          <p className="text-xl text-white mb-2">Your Access Token</p>
          <div className="bg-zinc-900 p-4 text-white rounded-xl whitespace-pre-wrap break-words">{accessToken}</div>
        </div>
      )}

      {refreshToken && (
        <div className="w-1/2 mx-auto mt-12">

          <p className="text-xl text-white mb-2">Your Refresh Token</p>
          <div className="bg-zinc-900 p-4 text-white rounded-xl whitespace-pre-wrap break-words">{refreshToken}</div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    }
  }
}