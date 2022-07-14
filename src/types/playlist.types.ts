import { ImageProps } from "./image.types"

export interface PlaylistProps {
  id: string
  name: string
  description?: string
  images: ImageProps[]
}