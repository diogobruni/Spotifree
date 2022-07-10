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
          {/* <div className="flex flex-row flex-grow"> */}
          <div className="flex flex-row flex-1 overflow-hidden">
            <Sidebar />

            <div className="bg-zinc-900 text-white flex-1 overflow-y-scroll">
              <FloatingUserBar />
              <Component {...pageProps} />
            </div>
          </div>

          <div className="h-24">
            <Player />
          </div>
        </div>

      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
