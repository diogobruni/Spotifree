import { atom } from "recoil"

interface localStorageEffectProps {
  setSelf: (arg0: string) => void
  onSet: (arg0: any) => void
}

const localStorageEffect: any = (key: string) => ({ setSelf, onSet }: localStorageEffectProps): void => {
  if (typeof localStorage === 'undefined') return

  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }

  onSet((newValue: any, _: any, isReset: any) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue))
  })
}

export const spotifyRefreshedtimeAtom = atom<number>({
  key: "spotifyRefreshedtimeAtom",
  default: 0,
  effects: [
    localStorageEffect("spotifyRefreshedtimeAtom"),
  ]
})

export const spotifyAccessTokenAtom = atom<string>({
  key: "spotifyAccessTokenAtom",
  default: undefined,
  effects: [
    localStorageEffect("spotifyAccessTokenAtom"),
  ]
})