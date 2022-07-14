import { ImageProps } from "./image.types"

export interface ArtistProps {
  id: string
  name: string
  images?: ImageProps[]
}