// src/components/product/ProductCard.tsx

import { useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'

import { formatTryPrice, useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'

import type { ProductCardDto } from '../../types'

export interface ProductCardProps {
  product: ProductCardDto
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist)
  const fav = isInWishlist(product.id)
  const [imgError, setImgError] = useState(false)

  const discounted = product.isDiscounted && product.discountPrice != null
  const showDiscountBadge = product.isDiscounted && product.discountPercent > 0
  const showNewBadge = product.isNew && !showDiscountBadge

  function handleCardClick() {
    navigate(`/urun/${product.slug}`)
  }

  function handleCartClick(e: MouseEvent) {
    e.stopPropagation()
    addItem(product)
  }

  function toggleFav(e: MouseEvent) {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-[var(--white)] outline-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[var(--accent)] relative z-0"
    >
      <div className="relative h-[280px] w-full overflow-hidden bg-[var(--bg)] sm:h-[340px]">
        {product.mainImageUrl && !imgError ? (
          /* ürün görseli (product.imageUrl) */
          <img
            src={product.mainImageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl" aria-hidden>
            🫖
          </div>
        )}

        {showDiscountBadge ? (
          <span className="absolute left-3 top-3 rounded bg-[var(--accent)] px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--white)] shadow-sm">
            %{product.discountPercent} İNDİRİM
          </span>
        ) : null}
        {showNewBadge ? (
          <span className="absolute left-3 top-3 rounded bg-[var(--dark)] px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--white)] shadow-sm">
            YENİ
          </span>
        ) : null}

        <button
          type="button"
          onClick={toggleFav}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--white)]/90 shadow-sm transition-transform hover:scale-110"
          aria-label={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        >
          <Heart size={18} fill={fav ? 'var(--accent)' : 'none'} color={fav ? 'var(--accent)' : 'var(--dark)'} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={handleCartClick}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[var(--dark)] text-[var(--white)] opacity-0 shadow-md transition-all duration-300 hover:scale-110 hover:bg-[var(--accent)] group-hover:opacity-100"
          aria-label="Sepete ekle"
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--mid)]">
            {product.categoryName}
          </p>
          <h3 className="mt-1.5 line-clamp-2 font-body text-[13px] leading-snug text-[var(--dark)] transition-colors group-hover:text-[var(--accent)]">
            {product.name}
          </h3>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          {discounted ? (
            <>
              <span className="font-body text-[14px] text-[var(--mid)] line-through">
                {formatTryPrice(product.price)}
              </span>
              <span className="font-body text-[16px] font-semibold text-[var(--accent)]">
                {formatTryPrice(product.discountPrice!)}
              </span>
            </>
          ) : (
            <span className="font-body text-[16px] font-medium text-[var(--dark)]">
              {formatTryPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
