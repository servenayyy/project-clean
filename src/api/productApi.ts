// src/api/productApi.ts

import {
  getProductBySlug,
  getProductsByCategory,
  searchProducts as searchProductsApi,
} from './index'

import type { PageResponse, ProductCardDto, ProductDetailDto } from '../types'

export interface CategoryProductsParams {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export async function fetchProductsByCategory(
  slug: string,
  params: CategoryProductsParams = {},
): Promise<PageResponse<ProductCardDto>> {
  const { page = 0 } = params
  return getProductsByCategory(slug, page)
}

export interface SearchProductsParams {
  page?: number
  size?: number
}

export async function searchProducts(
  query: string,
  params: SearchProductsParams = {},
): Promise<PageResponse<ProductCardDto>> {
  const { page = 0 } = params
  return searchProductsApi(query, page)
}

export async function fetchProductDetail(slug: string): Promise<ProductDetailDto> {
  return getProductBySlug(slug)
}

