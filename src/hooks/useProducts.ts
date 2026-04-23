// src/hooks/useProducts.ts

import { useCallback, useEffect, useState } from 'react'

import {
  fetchProductsByCategory,
  searchProducts,
  type CategoryProductsParams,
} from '../api/productApi'

import type { PageResponse, ProductCardDto } from '../types'

interface UseCategoryProductsState {
  page: PageResponse<ProductCardDto> | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useCategoryProducts(
  slug: string | undefined,
  pageIndex: number,
  sortBy: string,
  sortDir: 'asc' | 'desc',
): UseCategoryProductsState {
  const [page, setPage] = useState<PageResponse<ProductCardDto> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (!slug) {
      setPage(null)
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const params: CategoryProductsParams = {
        page: pageIndex,
        size: 12,
        sortBy,
        sortDir,
      }
      const res = await fetchProductsByCategory(slug, params)
      setPage(res)
    } catch (e) {
      setPage(null)
      setError(e instanceof Error ? e.message : 'Ürünler yüklenemedi.')
    } finally {
      setLoading(false)
    }
  }, [slug, pageIndex, sortBy, sortDir])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { page, loading, error, refetch }
}

interface UseSearchProductsState {
  page: PageResponse<ProductCardDto> | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useSearchProducts(
  query: string,
  pageIndex: number,
): UseSearchProductsState {
  const [page, setPage] = useState<PageResponse<ProductCardDto> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    const q = query.trim()
    if (!q) {
      setPage(null)
      setError(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await searchProducts(q, { page: pageIndex, size: 12 })
      setPage(res)
    } catch (e) {
      setPage(null)
      setError(e instanceof Error ? e.message : 'Arama başarısız oldu.')
    } finally {
      setLoading(false)
    }
  }, [query, pageIndex])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { page, loading, error, refetch }
}
