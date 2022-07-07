import { getProviders, signIn } from "next-auth/react"
import { Provider } from "next-auth/providers"
import Image from "next/image"

import spotifyLogo from "../../public/spotify-logo.png"

interface LoginProps {
  providers: Provider[]
}

export default function Login({ providers }: LoginProps) {
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
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
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