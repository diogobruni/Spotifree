export interface MediaSearchData {
  query: string
}

export interface MediaSearchResult {
  url: string
}

export interface MediaRepository {
  search: (data: MediaSearchData) => Promise<MediaSearchResult | {}>
}