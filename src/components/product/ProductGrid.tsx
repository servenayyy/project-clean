// src/components/product/ProductGrid.tsx

import { ProductCard } from './ProductCard'
import { ProductSkeleton } from './ProductSkeleton'

import type { ProductCardDto } from '../../types'

export interface ProductGridProps {
  products: ProductCardDto[]
  loading: boolean
  columns?: 4 | 3 | 2
}

function gridClass(columns: 4 | 3 | 2): string {
  if (columns === 2) {
    return 'grid grid-cols-1 gap-4 sm:grid-cols-2'
  }
  if (columns === 3) {
    return 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
  }
  return 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
}

export function ProductGrid({ products, loading, columns = 4 }: ProductGridProps) {
  const cls = gridClass(columns)

  if (loading) {
    return (
      <div className={cls}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={cls}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
