import { PlaylistProps } from "./playlist.types"

export interface CategoryWithPlaylistProps {
  id: string
  name: string
  playlists?: PlaylistProps[]
}