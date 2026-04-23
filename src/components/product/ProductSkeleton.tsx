// src/components/product/ProductSkeleton.tsx

export function ProductSkeleton() {
  return (
    <div className="border border-[var(--border)] bg-[var(--white)]">
      <div className="aspect-square animate-pulse bg-gray-200" />
      <div className="space-y-2 px-[14px] pb-[14px] pt-3">
        <div className="h-2 w-16 animate-pulse rounded-none bg-gray-200" />
        <div className="h-3 w-full animate-pulse bg-gray-200" />
        <div className="h-3 w-[85%] animate-pulse bg-gray-200" />
        <div className="h-4 w-24 animate-pulse bg-gray-200" />
      </div>
    </div>
  )
}
