// src/components/cart/CartDrawer.tsx

import { useEffect } from 'react'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useUiStore } from '../../store/uiStore'
import { useCartStore, getCartTotalPriceFormatted, formatTryPrice } from '../../store/cartStore'

export function CartDrawer() {
  const isOpen = useUiStore((s) => s.cartOpen)
  const toggleCart = useUiStore((s) => s.toggleCart)
  const { items, removeItem, updateQuantity } = useCartStore()

  // Press ESC to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        toggleCart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, toggleCart])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[var(--white)] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-labelledby="cart-title"
        role="dialog"
        aria-modal="true"
      >
        <header className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} className="text-[var(--dark)]" />
            <h2 id="cart-title" className="font-heading text-lg font-semibold text-[var(--dark)]">
              Alışveriş Sepeti ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--mid)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--dark)]"
            onClick={toggleCart}
            aria-label="Kapat"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={64} className="mb-6 text-[var(--border)]/50" strokeWidth={1} />
              <h3 className="font-heading text-xl font-medium text-[var(--dark)]">Sepetiniz Boş</h3>
              <p className="mt-2 max-w-sm font-body text-sm text-[var(--mid)]">
                Garip Ticaret’in yeni koleksiyonlarını keşfetmek için alışverişe hemen başlayın.
              </p>
              <button
                type="button"
                onClick={toggleCart}
                className="mt-8 border border-[var(--dark)] px-8 py-3 font-body text-xs font-semibold uppercase tracking-widest text-[var(--dark)] transition-colors hover:bg-[var(--dark)] hover:text-white"
              >
                Koleksiyonları Gör
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => {
                const price = item.product.discountPrice != null ? item.product.discountPrice : item.product.price
                return (
                  <div key={item.product.id} className="flex gap-4 group">
                    <Link
                      to={`/urun/${item.product.slug}`}
                      className="h-28 w-24 shrink-0 overflow-hidden rounded bg-[var(--bg)]"
                      onClick={toggleCart}
                    >
                      {item.product.mainImageUrl ? (
                        <img
                          src={item.product.mainImageUrl}
                          alt={item.product.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl">🫖</div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col py-1">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-[var(--mid)]">
                            {item.product.categoryName}
                          </p>
                          <Link
                            to={`/urun/${item.product.slug}`}
                            className="mt-1 line-clamp-2 font-body text-sm font-medium leading-snug text-[var(--dark)] hover:text-[var(--accent)]"
                            onClick={toggleCart}
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          type="button"
                          className="h-fit rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Ürünü sil"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-center gap-3 rounded border border-[var(--border)] px-2 py-1">
                          <button
                            type="button"
                            className="p-1 text-[var(--dark)] transition-colors hover:text-[var(--accent)] disabled:opacity-50"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-body text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-1 text-[var(--dark)] transition-colors hover:text-[var(--accent)]"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-heading text-lg font-medium text-[var(--accent)]">
                            {formatTryPrice(price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-[var(--border)] bg-[var(--bg)] p-6">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-[var(--dark)]">
                Ara Toplam
              </span>
              <span className="font-heading text-2xl font-semibold text-[var(--dark)]">
                {getCartTotalPriceFormatted(items)}
              </span>
            </div>
            <p className="mt-2 font-body text-xs text-[var(--mid)]">Kargo ve vergiler ödeme adımında eklenecektir.</p>
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 bg-[var(--accent)] px-6 py-4 font-body text-sm font-semibold uppercase tracking-widest text-white shadow-xl transition-transform hover:scale-[1.02] hover:bg-[#b5955e]"
              onClick={() => {
                toggleCart()
                // Redirect logic
              }}
            >
              Satın Almaya Devam Et <ArrowRight size={18} />
            </button>
          </footer>
        )}
      </div>
    </>
  )
}
