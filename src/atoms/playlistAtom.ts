import { atom } from 'recoil'
import { CacheProps } from '../hooks/useCache'
import { CategoryWithPlaylistProps } from '../types/category.type'

// export const playlistState = atom<SpotifyApi.SinglePlaylistResponse>({
//   key: "playlistState",
//   default: undefined
// })

export const playlistsCache = atom<CacheProps[]>({
  key: "playlistsCache",
  default: []
})

export const homeCategoriesPlaylists = atom<CategoryWithPlaylistProps[]>({
  key: "homeCategoriesPlaylists",
  default: []
})