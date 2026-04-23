// src/pages/CategoryPage.tsx

import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { ProductGrid } from '../components/product/ProductGrid'
import { Pagination } from '../components/ui/Pagination'
import { DowryPackagesSection } from '../components/home/DowryPackagesSection'

import { getCategories, getProductsByCategory } from '../api'

import type { CategoryMenuDto, PageResponse, ProductCardDto } from '../types'

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function findCategoryName(
  slug: string,
  tree: CategoryMenuDto[],
): string | null {
  for (const n of tree) {
    if (n.slug === slug) return n.name
    const child = findCategoryName(slug, n.children)
    if (child) return child
  }
  return null
}

type SortValue = 'new' | 'price-asc' | 'price-desc'

function sortParams(v: SortValue): { sortBy: string; sortDir: 'asc' | 'desc' } {
  if (v === 'price-asc') return { sortBy: 'price', sortDir: 'asc' }
  if (v === 'price-desc') return { sortBy: 'price', sortDir: 'desc' }
  return { sortBy: 'createdAt', sortDir: 'desc' }
}

interface CategoryPageBodyProps {
  slug: string
  menu: CategoryMenuDto[]
  menuError: string | null
}

function CategoryPageBody({ slug, menu, menuError }: CategoryPageBodyProps) {
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState<SortValue>('new')
  const [retryTick, setRetryTick] = useState(0)
  const [pageData, setPageData] = useState<PageResponse<ProductCardDto> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getProductsByCategory(slug, page)
        if (!cancelled) setPageData(res)
      } catch (e) {
        if (!cancelled) {
          setPageData(null)
          setError(e instanceof Error ? e.message : 'Ürünler yüklenemedi.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug, page, retryTick])

  const { sortBy, sortDir } = sortParams(sort)
  const sortedProducts = useMemo(() => {
    const list = pageData?.content ?? []
    const copy = [...list]
    if (sortBy === 'price') {
      copy.sort((a, b) =>
        sortDir === 'asc'
          ? (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
          : (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price),
      )
    }
    return copy
  }, [pageData?.content, sortBy, sortDir])

  const title = useMemo(() => {
    const fromMenu = findCategoryName(slug, menu)
    if (fromMenu) return fromMenu
    const fromProduct = pageData?.content[0]?.categoryName
    if (fromProduct && pageData?.content[0]?.categorySlug === slug) {
      return fromProduct
    }
    return humanizeSlug(slug)
  }, [slug, menu, pageData?.content])

  function handleSortChange(next: SortValue) {
    setSort(next)
    setPage(0)
  }

  return (
    <>
      {slug === 'ceyiz-paketleri' && <DowryPackagesSection />}
      
      <div className="mx-auto max-w-[1280px] px-4 py-8">
        <nav className="font-body text-[12px] text-[var(--mid)]">
        <Link to="/" className="hover:text-[var(--accent)]">
          Ana Sayfa
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[var(--dark)]">{title}</span>
      </nav>
      {menuError ? (
        <p className="mt-2 font-body text-[11px] text-[var(--accent)]">{menuError}</p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-heading text-[26px] font-medium text-[var(--dark)]">{title}</h1>
        <label className="flex flex-col gap-1 font-body text-[11px] uppercase tracking-[0.08em] text-[var(--mid)]">
          Sırala
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortValue)}
            className="border border-[var(--border)] bg-[var(--white)] px-3 py-2 font-body text-[13px] normal-case text-[var(--dark)]"
          >
            <option value="new">En Yeni</option>
            <option value="price-asc">Fiyat: Düşük → Yüksek</option>
            <option value="price-desc">Fiyat: Yüksek → Düşük</option>
          </select>
        </label>
      </div>

      {error ? (
        <div className="mt-8 text-center">
          <p className="font-body text-sm text-[var(--accent)]">{error}</p>
          <button
            type="button"
            onClick={() => setRetryTick((v) => v + 1)}
            className="mt-4 border border-[var(--border)] bg-[var(--white)] px-4 py-2 font-body text-[12px] text-[var(--dark)]"
          >
            Tekrar dene
          </button>
        </div>
      ) : null}

      <div className="mt-8">
        <ProductGrid products={sortedProducts} loading={loading} columns={4} />
      </div>

      {!loading && pageData ? (
        <Pagination
          pageNumber={pageData.pageNumber}
          totalPages={pageData.totalPages}
          onPageChange={setPage}
        />
      ) : null}
    </div>
    </>
  )
}

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [menu, setMenu] = useState<CategoryMenuDto[]>([])
  const [menuError, setMenuError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const m = await getCategories()
        if (!cancelled) setMenu(m)
      } catch (e) {
        if (!cancelled)
          setMenuError(e instanceof Error ? e.message : 'Menü yüklenemedi.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!slug) {
    return <Navigate to="/" replace />
  }

  return <CategoryPageBody key={slug} slug={slug} menu={menu} menuError={menuError} />
}
