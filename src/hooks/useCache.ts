import { useState } from "react"
import { useRecoilState } from "recoil"
import { playlistsCache } from "../atoms/playlistAtom"

export interface CacheProps {
  ref: string
  value: any
}

// type DataGenerator<T> = () => PromiseLike<T>;

type GetOrFetchProps<T> = (callback: Function, ref: string) => Promise<T>

export const useCache = <T = null>(initialValue: T): [T, GetOrFetchProps<T>] => {
  // const [cache, setCache] = useState<CacheProps[]>([]) // Only on playlist page
  const [cache, setCache] = useRecoilState(playlistsCache) // On whole app

  const [value, setValue] = useState<T>(initialValue)

  return [
    value,
    async (callback, ref) => {
      const findCacheIndex = cache.findIndex((c) => c.ref === ref)

      if (findCacheIndex >= 0) {
        setValue(cache[findCacheIndex].value)
        return cache[findCacheIndex].value
      } else {
        const value = await callback()
        if (value !== undefined) {
          setCache([...cache, { ref, value }])
          setValue(value)
          return value
        }
      }
    }
  ]
}