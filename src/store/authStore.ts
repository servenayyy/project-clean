// src/store/authStore.ts

import { create } from 'zustand'
import type { UserProfileResponse } from '../types'

interface AuthState {
  user: UserProfileResponse | null
  isAuthenticated: boolean
  setUser: (user: UserProfileResponse | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
