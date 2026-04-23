// src/pages/SearchPage.tsx

import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { ProductGrid } from '../components/product/ProductGrid'
import { Pagination } from '../components/ui/Pagination'

import { searchProducts } from '../api'

import type { PageResponse, ProductCardDto } from '../types'

interface SearchResultsProps {
  query: string
}

function SearchResults({ query }: SearchResultsProps) {
  const [page, setPage] = useState(0)
  const [retryTick, setRetryTick] = useState(0)
  const [pageData, setPageData] = useState<PageResponse<ProductCardDto> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const q = query.trim()
    if (!q) {
      setPageData(null)
      setError(null)
      setLoading(false)
      return
    }
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await searchProducts(q, page)
        if (!cancelled) setPageData(res)
      } catch (e) {
        if (!cancelled) {
          setPageData(null)
          setError(e instanceof Error ? e.message : 'Arama başarısız oldu.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [query, page, retryTick])

  const total = pageData?.totalElements ?? 0
  const queryLabel = query.trim()

  return (
    <>
      <h1 className="mt-6 font-heading text-[22px] font-medium text-[var(--dark)] sm:text-[26px]">
        {queryLabel ? (
          <>
            <span className="font-body text-[14px] font-normal text-[var(--mid)]">
              {total} ürün bulundu:{' '}
            </span>
            <span className="text-[var(--dark)]">&quot;{queryLabel}&quot;</span>
          </>
        ) : (
          'Arama yapmak için üst çubuktan bir terim girin.'
        )}
      </h1>

      {error ? (
        <div className="mt-8 text-center">
          <p className="font-body text-sm text-[var(--accent)]">{error}</p>
          <button
            type="button"
            onClick={() => setRetryTick((v) => v + 1)}
            className="mt-4 border border-[var(--border)] bg-[var(--white)] px-4 py-2 font-body text-[12px]"
          >
            Tekrar dene
          </button>
        </div>
      ) : null}

      {!loading && queryLabel && pageData && pageData.content.length === 0 ? (
        <p className="mt-10 text-center font-body text-[14px] text-[var(--mid)]">
          Bu arama için sonuç bulunamadı. Farklı bir anahtar kelime deneyin.
        </p>
      ) : null}

      <div className="mt-8">
        <ProductGrid products={pageData?.content ?? []} loading={loading} columns={4} />
      </div>

      {!loading && pageData && pageData.totalPages > 1 ? (
        <Pagination
          pageNumber={pageData.pageNumber}
          totalPages={pageData.totalPages}
          onPageChange={setPage}
        />
      ) : null}
    </>
  )
}

export function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <nav className="font-body text-[12px] text-[var(--mid)]">
        <Link to="/" className="hover:text-[var(--accent)]">
          Ana Sayfa
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[var(--dark)]">Arama</span>
      </nav>

      <SearchResults key={q} query={q} />
    </div>
  )
}
