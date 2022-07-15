import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

import { Sidebar } from '../components/Sidebar'
import Player from '../components/Player'

import '../styles/globals.css'
import FloatingUserBar from '../components/FloatingUserBar'
import { useRouter } from 'next/router'
import NoSSR from '../components/NoSSR'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  return (
    <SessionProvider session={session}>
      <RecoilRoot>

        {router.pathname === '/login' ? (
          <Component {...pageProps} />
        ) : (
          <NoSSR>
            <div className="flex flex-col h-screen bg-black">
              <div className="flex flex-row flex-1 overflow-hidden">
                <Sidebar />

                <div className="bg-black text-white flex-1 overflow-y-scroll scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-cursor-default">
                  <FloatingUserBar />
                  <Component {...pageProps} />
                </div>
              </div>

              <div className="h-24">
                <Player />
              </div>
            </div>
          </NoSSR>
        )}

      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
