import YouTubeSR from "youtube-sr"

import { MediaSearchData, MediaSearchResult, MediaRepository } from '../media-repository'

export class YoutubeSRRepository implements MediaRepository {
  async search(data: MediaSearchData) {
    try {
      const result = await YouTubeSR.searchOne(data.query)
      if (!result.id) return {}

      return {
        id: result.id,
        title: result.title
      } as MediaSearchResult
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}