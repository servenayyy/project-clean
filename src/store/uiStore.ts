// src/store/uiStore.ts

import { create } from 'zustand'

interface UiState {
  sidebarOpen: boolean
  searchOpen: boolean
  cartOpen: boolean
  profileOpen: boolean
  toggleSidebar: () => void
  toggleSearch: () => void
  toggleCart: () => void
  toggleProfile: () => void
  closeAll: () => void
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  searchOpen: false,
  cartOpen: false,
  profileOpen: false,
  toggleSidebar: () =>
    set((s) => ({ sidebarOpen: !s.sidebarOpen, searchOpen: false, cartOpen: false, profileOpen: false })),
  toggleSearch: () =>
    set((s) => ({ searchOpen: !s.searchOpen, sidebarOpen: false, cartOpen: false, profileOpen: false })),
  toggleCart: () =>
    set((s) => ({ cartOpen: !s.cartOpen, searchOpen: false, sidebarOpen: false, profileOpen: false })),
  toggleProfile: () =>
    set((s) => ({ profileOpen: !s.profileOpen, searchOpen: false, sidebarOpen: false, cartOpen: false })),
  closeAll: () => set({ sidebarOpen: false, searchOpen: false, cartOpen: false, profileOpen: false }),
}))
