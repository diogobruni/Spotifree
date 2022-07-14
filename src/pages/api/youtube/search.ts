// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { YoutubeSearchRepository } from '../../../repositories/youtube-search/youtube-search-repository'
import { SearchMediaUseCase } from '../../../use-cases/search-media-use-case'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query as { query: string }

  const youtubeSearchRepository = new YoutubeSearchRepository()
  const searchMediaUseCase = new SearchMediaUseCase(youtubeSearchRepository)
  const result = await searchMediaUseCase.execute({ query })

  res.status(200).json(result)
}
