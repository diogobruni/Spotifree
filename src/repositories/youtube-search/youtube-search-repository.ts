import youtubeSearch, { YouTubeSearchOptions } from "youtube-search"

import { MediaSearchData, MediaSearchResult, MediaRepository } from '../media-repository'

export class YoutubeSearchRepository implements MediaRepository {
  async search(data: MediaSearchData) {
    const opts: YouTubeSearchOptions = {
      maxResults: 10,
      key: process.env.YOUTUBE_API
    }

    try {
      const { results } = await youtubeSearch(data.query, opts)
      if (!results.length) return {}

      return {
        id: results[0].id,
        url: results[0].link
      } as MediaSearchResult
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}