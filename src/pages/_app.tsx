import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

import { Sidebar } from '../components/Sidebar'
import Player from '../components/Player'

import '../styles/globals.css'
import FloatingUserBar from '../components/FloatingUserBar'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>

        <div className="flex flex-col h-screen bg-black">
          <div className="flex flex-grow flex-row">
            <Sidebar />

            <div className="bg-zinc-800 text-white flex-grow">
              <FloatingUserBar />
              <Component {...pageProps} />
            </div>
          </div>

          <div className="h-28">
            <Player />
          </div>
        </div>

      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
