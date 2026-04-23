// src/store/cartStore.ts

import { create } from 'zustand'

import type { ProductCardDto } from '../types'

export interface CartItem {
  product: ProductCardDto
  quantity: number
}

function unitPrice(product: ProductCardDto): number {
  return product.discountPrice != null ? product.discountPrice : product.price
}

export function formatTryPrice(value: number): string {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value)
}

export function getCartTotalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartTotalPrice(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + unitPrice(item.product) * item.quantity, 0)
}

export function getCartTotalPriceFormatted(items: CartItem[]): string {
  return formatTryPrice(getCartTotalPrice(items))
}

interface CartState {
  items: CartItem[]
  addItem: (product: ProductCardDto) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    const { items } = get()
    const existing = items.find((i) => i.product.id === product.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      })
    } else {
      set({ items: [...items, { product, quantity: 1 }] })
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.product.id !== id) })
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((i) => i.product.id !== id) })
      return
    }
    set({
      items: get().items.map((i) =>
        i.product.id === id ? { ...i, quantity } : i,
      ),
    })
  },
}))

export function useCartTotalItems(): number {
  return useCartStore((s) => getCartTotalItems(s.items))
}

export function useCartTotalPriceFormatted(): string {
  return useCartStore((s) => getCartTotalPriceFormatted(s.items))
}
