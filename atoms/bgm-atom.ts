import { atom } from '@recoil'

export interface BgmState {
  file: string,
  volume: number,
}

export const BgmAtom = atom({
  key: 'BgmAtom',
  default: { file: null },
})
