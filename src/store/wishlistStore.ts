import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { ProductCardDto } from '../types'

interface WishlistState {
  items: ProductCardDto[]
  toggle: (product: ProductCardDto) => void
  isInWishlist: (id: number) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some((item) => item.id === product.id)
        if (exists) {
          set({ items: get().items.filter((item) => item.id !== product.id) })
          return
        }
        set({ items: [...get().items, product] })
      },
      isInWishlist: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: 'garip-wishlist-store',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
