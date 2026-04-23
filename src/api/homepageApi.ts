// src/api/homepageApi.ts

import { getHomepage } from './index'

import type { HomepageResponse } from '../types'

export async function fetchHomepage(): Promise<HomepageResponse> {
  return getHomepage()
}
