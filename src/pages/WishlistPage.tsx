import { Link } from 'react-router-dom'

import { ProductGrid } from '../components/product/ProductGrid'

import { useWishlistStore } from '../store/wishlistStore'

export function WishlistPage() {
  const products = useWishlistStore((s) => s.items)

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <h1 className="font-heading text-[30px] text-[var(--dark)]">Favorilerim</h1>
      <p className="mt-2 font-body text-sm text-[var(--mid)]">
        Kaydettiğiniz ürünleri buradan inceleyebilirsiniz.
      </p>

      {products.length === 0 ? (
        <div className="mt-10 rounded-lg border border-[var(--border)] bg-[var(--white)] p-8 text-center">
          <p className="font-body text-sm text-[var(--mid)]">Henüz favori ürün eklenmemiş.</p>
          <Link
            to="/"
            className="mt-4 inline-block border border-[var(--dark)] px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-[var(--dark)] transition-colors hover:bg-[var(--dark)] hover:text-[var(--white)]"
          >
            Alışverişe dön
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid products={products} loading={false} columns={4} />
        </div>
      )}
    </div>
  )
}
