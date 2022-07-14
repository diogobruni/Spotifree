import { ImageProps } from "./image.types"

export interface AlbumProps {
  id: string
  name: string
  images: ImageProps[]
}