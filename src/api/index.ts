import axios from 'axios'

import type { CategoryMenuDto, HomepageResponse, PageResponse, ProductCardDto, ProductDetailDto } from '../types'

const api = axios.create({ baseURL: '/api' })

export const getHomepage = () =>
  api.get<{ data: HomepageResponse }>('/homepage').then((r) => r.data.data)

export const getCategories = () =>
  api.get<{ data: CategoryMenuDto[] }>('/categories/menu').then((r) => r.data.data)

export const getProductsByCategory = (slug: string, page = 0) =>
  api
    .get<{ data: PageResponse<ProductCardDto> }>(`/products/by-category/${slug}?page=${page}&size=12`)
    .then((r) => r.data.data)

export const getProductBySlug = (slug: string) =>
  api.get<{ data: ProductDetailDto }>(`/products/${slug}`).then((r) => r.data.data)

export const searchProducts = (query: string, page = 0) =>
  api
    .get<{ data: PageResponse<ProductCardDto> }>(`/products/search?query=${query}&page=${page}&size=12`)
    .then((r) => r.data.data)

export const createOrder = (body: any) =>
  api.post<{ data: unknown }>('/orders', body).then((r) => r.data.data)
