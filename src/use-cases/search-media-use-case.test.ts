import { SearchMediaUseCase } from './search-media-use-case'

const searchMediaSpy = jest.fn()

const searchMedia = new SearchMediaUseCase(
  { search: searchMediaSpy }
)

describe('Search media', () => {
  it('should be able to search media', async () => {
    await expect(searchMedia.execute({
      query: 'Lorem ipsum'
    })).resolves.not.toThrow()

    expect(searchMediaSpy).toHaveBeenCalled()
  })

  it('should not be able to search media with empty query', async () => {
    await expect(searchMedia.execute({
      query: ''
    })).rejects.toThrow()
  })
})