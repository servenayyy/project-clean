// src/hooks/useHomepage.ts

import { useCallback, useEffect, useState } from 'react'

import { fetchHomepage } from '../api/homepageApi'

import type { HomepageResponse } from '../types'

interface UseHomepageResult {
  data: HomepageResponse | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useHomepage(): UseHomepageResult {
  const [data, setData] = useState<HomepageResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchHomepage()
      setData(res)
    } catch (e) {
      setData(null)
      setError(e instanceof Error ? e.message : 'Beklenmeyen bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, loading, error, refetch: load }
}
