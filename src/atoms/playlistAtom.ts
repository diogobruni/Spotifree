import { atom } from 'recoil'
import { CacheProps } from '../hooks/useCache'

// export const playlistState = atom<SpotifyApi.SinglePlaylistResponse>({
//   key: "playlistState",
//   default: undefined
// })

export const playlistsCache = atom<CacheProps[]>({
  key: "playlistsCache",
  default: []
})

interface CategoryWithPlaylistsProps extends SpotifyApi.CategoryObject {
  playlists?: SpotifyApi.PlaylistObjectSimplified[]
}

export const homeCategoriesPlaylists = atom<CategoryWithPlaylistsProps[]>({
  key: "homeCategoriesPlaylists",
  default: []
})