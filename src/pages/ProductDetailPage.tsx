// src/pages/ProductDetailPage.tsx

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '../components/ui/Button'

import { getProductBySlug } from '../api'
import { formatTryPrice, useCartStore } from '../store/cartStore'

import type { ProductCardDto, ProductDetailDto, ProductImageDto } from '../types'

function detailToCard(p: ProductDetailDto): ProductCardDto {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    discountPrice: p.discountPrice,
    mainImageUrl: p.mainImageUrl,
    isNew: p.isNew,
    isDiscounted: p.isDiscounted,
    discountPercent: p.discountPercent,
    categorySlug: p.categorySlug,
    categoryName: p.categoryName,
  }
}

function sortedImages(images: ProductImageDto[], mainUrl: string | null): ProductImageDto[] {
  const copy = [...images].sort((a, b) => a.displayOrder - b.displayOrder)
  if (copy.length > 0) return copy
  if (mainUrl) {
    return [{ id: 0, imageUrl: mainUrl, isMain: true, displayOrder: 0 }]
  }
  return []
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const addItem = useCartStore((s) => s.addItem)
  const [product, setProduct] = useState<ProductDetailDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [mainError, setMainError] = useState(false)

  const load = useCallback(async () => {
    if (!slug) {
      setProduct(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const p = await getProductBySlug(slug)
      setProduct(p)
      const imgs = sortedImages(p.images, p.mainImageUrl)
      const main =
        imgs.find((i) => i.isMain)?.imageUrl ?? imgs[0]?.imageUrl ?? p.mainImageUrl
      setActiveUrl(main)
      setMainError(false)
    } catch (e) {
      setProduct(null)
      setError(e instanceof Error ? e.message : 'Ürün yüklenemedi.')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    void load()
  }, [load])

  const discounted = product?.isDiscounted && product.discountPrice != null

  const thumbs = useMemo(() => {
    if (!product) return []
    return sortedImages(product.images, product.mainImageUrl)
  }, [product])

  if (loading) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="aspect-square animate-pulse bg-gray-200" />
          <div className="space-y-4">
            <div className="h-6 w-[75%] animate-pulse bg-gray-200" />
            <div className="h-10 w-[50%] animate-pulse bg-gray-200" />
            <div className="h-24 animate-pulse bg-gray-200" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 text-center">
        <p className="font-body text-sm text-[var(--accent)]">
          {error || 'Ürün bulunamadı.'}
        </p>
        <button
          type="button"
          onClick={() => void load()}
          className="mt-4 border border-[var(--border)] bg-[var(--white)] px-4 py-2 font-body text-[12px]"
        >
          Tekrar dene
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <nav className="font-body text-[12px] text-[var(--mid)]">
        <Link to="/" className="hover:text-[var(--accent)]">
          Ana Sayfa
        </Link>
        <span className="mx-2">›</span>
        <Link
          to={`/kategori/${product.categorySlug}`}
          className="hover:text-[var(--accent)]"
        >
          {product.categoryName}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[var(--dark)]">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div>
          <div className="aspect-square border border-[var(--border)] bg-[var(--bg)]">
            {activeUrl && !mainError ? (
              <img
                src={activeUrl}
                alt=""
                className="h-full w-full object-contain"
                onError={() => setMainError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-6xl">🫖</div>
            )}
          </div>
          {thumbs.length > 1 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {thumbs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActiveUrl(t.imageUrl)
                    setMainError(false)
                  }}
                  className={`h-16 w-16 border bg-[var(--white)] ${
                    activeUrl === t.imageUrl
                      ? 'border-[var(--dark)]'
                      : 'border-[var(--border)]'
                  }`}
                >
                  <img
                    src={t.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.visibility = 'hidden'
                    }}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h1 className="font-heading text-[28px] font-medium leading-tight text-[var(--dark)] sm:text-[32px]">
            {product.name}
          </h1>
          {product.shortDescription ? (
            <p className="mt-3 font-body text-[13px] leading-relaxed text-[var(--mid)]">
              {product.shortDescription}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {discounted ? (
              <>
                <span className="font-body text-lg text-[var(--mid)] line-through">
                  {formatTryPrice(product.price)}
                </span>
                <span className="font-heading text-[32px] font-medium text-[var(--accent)]">
                  {formatTryPrice(product.discountPrice!)}
                </span>
                {product.discountPercent > 0 ? (
                  <span className="bg-[var(--accent)] px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--white)]">
                    %{product.discountPercent} İndirim
                  </span>
                ) : null}
              </>
            ) : (
              <span className="font-heading text-[32px] font-medium text-[var(--dark)]">
                {formatTryPrice(product.price)}
              </span>
            )}
          </div>

          <p className="mt-4 font-body text-[13px]">
            {product.stockQuantity > 0 ? (
              <span className="text-emerald-700">Stokta var ✓</span>
            ) : (
              <span className="text-[var(--mid)]">Stok tükendi</span>
            )}
          </p>

          {(product.brand || product.material || product.color || product.volume) && (
            <table className="mt-6 w-full border border-[var(--border)] text-left font-body text-[13px]">
              <tbody>
                {product.brand ? (
                  <tr className="border-b border-[var(--border)]">
                    <th className="w-[120px] bg-[var(--bg)] px-3 py-2 font-medium text-[var(--mid)]">
                      Marka
                    </th>
                    <td className="px-3 py-2 text-[var(--dark)]">{product.brand}</td>
                  </tr>
                ) : null}
                {product.material ? (
                  <tr className="border-b border-[var(--border)]">
                    <th className="bg-[var(--bg)] px-3 py-2 font-medium text-[var(--mid)]">
                      Malzeme
                    </th>
                    <td className="px-3 py-2 text-[var(--dark)]">{product.material}</td>
                  </tr>
                ) : null}
                {product.color ? (
                  <tr className="border-b border-[var(--border)]">
                    <th className="bg-[var(--bg)] px-3 py-2 font-medium text-[var(--mid)]">
                      Renk
                    </th>
                    <td className="px-3 py-2 text-[var(--dark)]">{product.color}</td>
                  </tr>
                ) : null}
                {product.volume ? (
                  <tr>
                    <th className="bg-[var(--bg)] px-3 py-2 font-medium text-[var(--mid)]">
                      Hacim
                    </th>
                    <td className="px-3 py-2 text-[var(--dark)]">{product.volume}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          )}

          <Button
            variant="accent"
            fullWidth
            className="mt-8"
            disabled={product.stockQuantity <= 0}
            onClick={() => addItem(detailToCard(product))}
          >
            Sepete Ekle
          </Button>
          <button
            type="button"
            className="mt-3 w-full font-body text-[12px] font-medium text-[var(--dark)] underline-offset-2 hover:underline"
          >
            Favorilere Ekle
          </button>
        </div>
      </div>

      {product.description ? (
        <section className="mt-12 border-t border-[var(--border)] pt-8">
          <h2 className="font-heading text-[22px] font-medium text-[var(--dark)]">
            Ürün Açıklaması
          </h2>
          <div className="mt-4 max-w-none font-body text-[13px] leading-relaxed text-[var(--dark)]">
            {product.description.split('\n').map((para, i) => (
              <p key={i} className="mb-3">
                {para}
              </p>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
