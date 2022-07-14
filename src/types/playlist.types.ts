import { ImageProps } from "next/image"

export interface PlaylistProps {
  id: string
  name: string
  description?: string
  images: ImageProps[]
}