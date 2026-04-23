// src/api/axiosInstance.ts

import axios, { type AxiosError } from 'axios'

import type { ApiResponse } from '../types'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>
    if (body && typeof body === 'object' && 'success' in body) {
      if (!body.success) {
        return Promise.reject(new Error(body.message || 'İstek başarısız oldu.'))
      }
      return {
        ...response,
        data: body.data,
      }
    }
    return response
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    const msg =
      error.response?.data?.message ||
      error.message ||
      'Bağlantı hatası oluştu.'
    return Promise.reject(new Error(msg))
  },
)
