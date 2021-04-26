import { atom } from '@recoil'

export interface SidebarState {
  show: boolean
}

const defaultSidebarState: SidebarState = {
  show: true,
}

export const SidebarConditionAtom = atom({
  key: 'SidebarConditionAtom',
  default: defaultSidebarState,
})
