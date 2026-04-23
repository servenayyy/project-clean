// src/pages/HomePage.tsx

import { useEffect, useMemo, useState } from 'react'

import { FeaturesBar } from '../components/home/FeaturesBar'
import { HeroBanner } from '../components/home/HeroBanner'
import { DowryPackagesSection } from '../components/home/DowryPackagesSection'
import { PromoBanners } from '../components/home/PromoBanners'
import { SectionHeader } from '../components/home/SectionHeader'
import { ProductGrid } from '../components/product/ProductGrid'
import { CategoryChips } from '../components/ui/CategoryChips'

import { getHomepage } from '../api'
import type { HomepageResponse } from '../types'

export function HomePage() {
  const [data, setData] = useState<HomepageResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [discountFilterSlug, setDiscountFilterSlug] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getHomepage()
        if (!cancelled) setData(res)
      } catch (e) {
        if (!cancelled) {
          setData(null)
          setError(e instanceof Error ? e.message : 'Ana sayfa yüklenemedi.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const featured = data?.featuredProducts?.[0] ?? null

  const filteredDiscounted = useMemo(() => {
    const list = data?.discountedProducts ?? []
    if (!discountFilterSlug) return list
    return list.filter((p) => p.categorySlug === discountFilterSlug)
  }, [data?.discountedProducts, discountFilterSlug])

  if (!data && loading) {
    return <div className="mx-auto max-w-[1280px] px-4 py-16 text-center">Yükleniyor...</div>
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 text-center">
        <p className="font-body text-sm text-[var(--accent)]">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 border border-[var(--border)] bg-[var(--white)] px-4 py-2 font-body text-[12px] font-medium text-[var(--dark)] hover:border-[var(--dark)]"
        >
          Tekrar dene
        </button>
      </div>
    )
  }

  return (
    <div>
      <HeroBanner featuredProduct={featured} categories={data?.featuredCategories ?? []} />

      <div className="mx-auto max-w-[1280px] px-4 py-20">
        <SectionHeader title="Yeni Gelenler" linkTo="/kategori/yeni-gelenler" />
        <ProductGrid products={(data?.newArrivals ?? []).slice(0, 8)} loading={loading} columns={4} />
      </div>

      <PromoBanners />

      <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-10">
        <SectionHeader title="İndirimli Ürünler" linkTo="/kampanyalar" />
        <div className="mb-8">
          <CategoryChips
            categories={data?.homepageCategories ?? []}
            activeSlug={discountFilterSlug}
            onChange={setDiscountFilterSlug}
          />
        </div>
        <ProductGrid products={filteredDiscounted} loading={loading} columns={4} />
      </div>

      <FeaturesBar />
      <DowryPackagesSection />
    </div>
  )
}
