import { MediaRepository } from "../repositories/media-repository"

interface SearchMediaUseCaseRequest {
  query: string
}

export class SearchMediaUseCase {
  constructor(
    private mediaRepository: MediaRepository,
  ) { }

  async execute(request: SearchMediaUseCaseRequest) {
    const { query } = request

    if (!query) {
      throw new Error('Query is required')
    }

    return await this.mediaRepository.search({ query })
  }
}