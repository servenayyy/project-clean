// src/api/profileApi.ts

import { axiosInstance } from './axiosInstance'
import type { UserProfileResponse } from '../types'

export async function fetchProfile(): Promise<UserProfileResponse> {
  const { data } = await axiosInstance.get<UserProfileResponse>('/api/profile')
  return data
}

export async function updateProfile(payload: {
  firstName: string
  lastName: string
  phone?: string | null
}): Promise<UserProfileResponse> {
  const { data } = await axiosInstance.put<UserProfileResponse>('/api/profile', payload)
  return data
}

// Add more like changePassword, etc...
