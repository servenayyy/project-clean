// src/components/layout/CategoryIconsRow.tsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchCategoryMenu } from '../../api/categoryApi'
import { withCategoryPlaceholder } from '../../utils/images'

import type { CategoryMenuDto } from '../../types'

function CategoryIconItem({ item }: { item: CategoryMenuDto }) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const src = item.imageUrl
    ? withCategoryPlaceholder(item.imageUrl, item.slug)
    : item.iconUrl || withCategoryPlaceholder(null, item.slug)

  return (
    <button
      type="button"
      onClick={() => navigate(`/kategori/${item.slug}`)}
      className="group flex w-[84px] shrink-0 flex-col items-center gap-3 text-center"
    >
      <div className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full bg-[var(--white)] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
        {src && !imgError ? (
          /* kategori görseli (category.imageUrl) */
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-2xl text-[var(--mid)]/30" aria-hidden>
            🏺
          </span>
        )}
      </div>
      <span className="font-body text-[12px] font-medium leading-tight text-[var(--dark)] transition-colors group-hover:text-[var(--accent)]">{item.name}</span>
    </button>
  )
}

export function CategoryIconsRow() {
  const [items, setItems] = useState<CategoryMenuDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchCategoryMenu()
        if (!cancelled) setItems(data)
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Kategoriler yüklenemedi.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1280px] px-4">
        {error ? (
          <p className="font-body text-xs text-red-500">{error}</p>
        ) : null}
        <div className="flex gap-6 overflow-x-auto pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex w-[84px] shrink-0 flex-col items-center gap-3">
                  <div className="h-[80px] w-[80px] animate-pulse rounded-full bg-[var(--border)]" />
                  <div className="h-3 w-16 animate-pulse rounded bg-[var(--border)]" />
                </div>
              ))
            : items.map((item) => <CategoryIconItem key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}
