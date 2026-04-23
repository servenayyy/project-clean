// src/api/categoryApi.ts

import { getCategories } from './index'

import type { CategoryMenuDto } from '../types'

export async function fetchCategoryMenu(): Promise<CategoryMenuDto[]> {
  return getCategories()
}
