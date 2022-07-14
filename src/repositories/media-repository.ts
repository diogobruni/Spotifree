export interface MediaSearchData {
  query: string
}

export interface MediaSearchResult {
  id: string
  url?: string
  title?: string
}

export interface MediaRepository {
  search: (data: MediaSearchData) => Promise<MediaSearchResult | {}>
}