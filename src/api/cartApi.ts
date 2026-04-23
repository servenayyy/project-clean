// src/api/cartApi.ts

import { axiosInstance } from './axiosInstance'
import type { CartResponse } from '../types'

export async function fetchCart(): Promise<CartResponse> {
  const { data } = await axiosInstance.get<CartResponse>('/api/cart')
  return data
}

export async function addToCart(productId: number, quantity: number = 1): Promise<CartResponse> {
  const { data } = await axiosInstance.post<CartResponse>('/api/cart/items', { productId, quantity })
  return data
}

export async function updateCartItemQuantity(itemId: number, quantity: number): Promise<CartResponse> {
  const { data } = await axiosInstance.patch<CartResponse>(`/api/cart/items/${itemId}`, { quantity })
  return data
}

export async function removeCartItem(itemId: number): Promise<CartResponse> {
  const { data } = await axiosInstance.delete<CartResponse>(`/api/cart/items/${itemId}`)
  return data
}

export async function clearCart(): Promise<void> {
  await axiosInstance.delete('/api/cart/clear')
}
