// src/components/home/HeroBanner.tsx

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import type { CategoryDto, ProductCardDto } from '../../types'
import { withCategoryPlaceholder } from '../../utils/images'

export interface HeroBannerProps {
  featuredProduct: ProductCardDto | null
  categories: CategoryDto[]
}

const HERO_BANNERS = [
  {
    title: 'Mutfak Tarzını Yenile',
    slug: 'mutfak',
    imageUrl: '/banners/bannermutfaktarziniyenile.jpeg',
  },
  {
    title: 'Dekor Detaylarla Evinizi Canlandırın',
    slug: 'dekor',
    imageUrl: '/banners/dekor banner.jpeg',
  },
  {
    title: 'Çeyiz Paketlerinde Avantajlı Seçimler',
    slug: 'ceyiz-paketleri',
    imageUrl: '/banners/ceyiz paketi banner.jpeg',
  },
  {
    title: 'Yeni Sezon Ürünleri Keşfedin',
    slug: 'yeni-gelenler',
    imageUrl: encodeURI('/banners/WhatsApp Image 2026-04-21 at 17.32.34.jpeg'),
  },
] as const

export function HeroBanner({ featuredProduct, categories }: HeroBannerProps) {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0)
  const fallbackImage = featuredProduct?.mainImageUrl ?? null
  const activeBanner = HERO_BANNERS[activeBannerIndex]

  const categoriesBySlug = useMemo(
    () => new Map(categories.map((category) => [category.slug, category])),
    [categories],
  )

  const categoryItems = useMemo(
    () =>
      categories
        .slice()
        .sort((a, b) => a.menuOrder - b.menuOrder)
        .slice(0, 12),
    [categories],
  )

  const goPrev = () => {
    setActiveBannerIndex((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1))
  }

  const goNext = () => {
    setActiveBannerIndex((prev) => (prev === HERO_BANNERS.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="bg-[var(--white)] pt-4 sm:pt-6">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="relative h-[260px] overflow-hidden rounded-[2px] bg-[var(--dark)] sm:h-[360px] lg:h-[420px]">
          <Link to={`/kategori/${activeBanner.slug}`} className="absolute inset-0 block h-full w-full">
            {activeBanner.imageUrl || fallbackImage ? (
              <img
                src={activeBanner.imageUrl || fallbackImage!}
                alt={activeBanner.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                Resim Yükleniyor...
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-[var(--dark)] transition hover:bg-white"
            aria-label="Önceki banner"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-[var(--dark)] transition hover:bg-white"
            aria-label="Sonraki banner"
          >
            ›
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-start justify-center gap-x-5 gap-y-6 rounded-2xl bg-[#fafafa] px-4 py-5 sm:gap-x-6 sm:gap-y-7 sm:px-6">
          {categoryItems.map((category) => {
            const matchedBanner = HERO_BANNERS.find((banner) => banner.slug === category.slug)
            const imageSrc =
              matchedBanner?.imageUrl ||
              withCategoryPlaceholder(categoriesBySlug.get(category.slug)?.imageUrl ?? null, category.slug) ||
              '/banners/bannermutfaktarziniyenile.jpeg'

            return (
              <Link
                key={category.id}
                to={`/kategori/${category.slug}`}
                className="group flex w-[92px] flex-col items-center gap-2 text-center sm:w-[104px]"
              >
                <div className="h-[72px] w-full overflow-hidden rounded-xl bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-[#f0f0f0] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)] sm:h-[82px]">
                  <img
                    src={imageSrc}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="line-clamp-2 text-[11px] font-medium leading-4 text-[#222] sm:text-xs">{category.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
