// src/types/index.ts

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface CategoryDto {
  id: number
  name: string
  slug: string
  imageUrl: string | null
  iconUrl: string | null
  menuOrder: number
}

export interface CategoryMenuDto {
  id: number
  name: string
  slug: string
  imageUrl: string | null
  iconUrl: string | null
  menuOrder: number
  children: CategoryMenuDto[]
}

export interface ProductCardDto {
  id: number
  name: string
  slug: string
  price: number
  discountPrice: number | null
  mainImageUrl: string | null
  isNew: boolean
  isDiscounted: boolean
  discountPercent: number
  categorySlug: string
  categoryName: string
}

export interface ProductImageDto {
  id: number
  imageUrl: string
  isMain: boolean
  displayOrder: number
}

export interface ProductDetailDto {
  id: number
  name: string
  slug: string
  shortDescription: string
  description: string
  price: number
  discountPrice: number | null
  discountPercent: number
  stockQuantity: number
  sku: string
  brand: string | null
  material: string | null
  color: string | null
  volume: string | null
  isNew: boolean
  isDiscounted: boolean
  isFeatured: boolean
  isActive: boolean
  mainImageUrl: string | null
  images: ProductImageDto[]
  categoryId: number
  categoryName: string
  categorySlug: string
}

export interface HomepageResponse {
  featuredCategories: CategoryDto[]
  homepageCategories: CategoryDto[]
  newArrivals: ProductCardDto[]
  discountedProducts: ProductCardDto[]
  featuredProducts: ProductCardDto[]
}

export interface PageResponse<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}

// --- User Profile DTOs ---
export interface AddressDto {
  city: string | null
  district: string | null
  fullAddress: string | null
  zipCode: string | null
}

export interface UserProfileResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string | null
  address: AddressDto | null
}

// --- Cart DTOs ---
export interface CartItemResponse {
  id: number
  productId: number
  productName: string
  productSlug: string
  productImageUrl: string | null
  unitPrice: number
  quantity: number
  subtotal: number
}

export interface CartResponse {
  cartId: number
  items: CartItemResponse[]
  totalAmount: number
  totalItems: number
}

