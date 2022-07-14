import { AlbumProps } from "./album.types"
import { ArtistProps } from "./artist.types"

export interface TrackProps {
  id: string
  name: string
  duration_ms: number
  album?: AlbumProps
  artists?: ArtistProps[]
}

export interface TrackListProps {
  sourceId: string
  tracks: TrackProps[]
}