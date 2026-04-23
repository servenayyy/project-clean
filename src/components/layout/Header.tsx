// src/components/layout/Header.tsx

import { Link, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react'

import { SearchBar } from '../ui/SearchBar'

import { useCartTotalItems } from '../../store/cartStore'
import { useUiStore } from '../../store/uiStore'
import { useWishlistStore } from '../../store/wishlistStore'

export function Header() {
  const navigate = useNavigate()
  const totalItems = useCartTotalItems()
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const searchOpen = useUiStore((s) => s.searchOpen)
  const toggleSearch = useUiStore((s) => s.toggleSearch)
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)
  const toggleCart = useUiStore((s) => s.toggleCart)
  const toggleProfile = useUiStore((s) => s.toggleProfile)
  const closeAll = useUiStore((s) => s.closeAll)

  function goSearch(q: string) {
    closeAll()
    navigate(`/arama?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--white)]/95 backdrop-blur-md transition-all duration-300 focus-within:bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-4 py-5 lg:gap-8">
        <div className="flex shrink-0 items-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex items-center gap-2 text-[var(--dark)] transition-colors hover:text-[var(--accent)]"
            aria-label="Menüyü aç"
          >
            <Menu size={24} strokeWidth={1.5} />
            <span className="hidden pt-0.5 font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--mid)] md:block">MENU</span>
          </button>
          
          <Link
            to="/"
            className="font-heading text-[26px] font-bold leading-none tracking-widest text-[var(--dark)] transition-colors hover:text-[var(--accent)] sm:text-[30px]"
          >
            GARİP
          </Link>
        </div>

        <div className="hidden min-w-0 flex-1 md:block">
          <SearchBar onSubmitSearch={goSearch} />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-[var(--dark)] md:hidden transition-transform hover:scale-105 hover:text-[var(--accent)]"
            onClick={toggleSearch}
            aria-label="Aramayı aç"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-[var(--dark)] transition-transform hover:scale-105 hover:text-[var(--accent)]"
            aria-label="Hesabım"
            onClick={toggleProfile}
          >
            <User size={22} strokeWidth={1.5} />
          </button>

          <Link
            to="/favoriler"
            className="relative flex h-10 w-10 items-center justify-center text-[var(--dark)] transition-transform hover:scale-105 hover:text-[var(--accent)]"
            aria-label="Favoriler"
          >
            <Heart size={22} strokeWidth={1.5} />
            {wishlistCount > 0 ? (
              <span className="absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center bg-[var(--accent)] px-0.5 font-body text-[9px] font-semibold text-[var(--white)]">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center text-[var(--dark)] transition-transform hover:scale-105 hover:text-[var(--accent)]"
            aria-label="Sepet"
            onClick={toggleCart}
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 ? (
              <span className="absolute right-0 top-0 flex h-4 min-w-[16px] items-center justify-center bg-[var(--accent)] px-0.5 font-body text-[9px] font-semibold text-[var(--white)]">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-[var(--border)] bg-[var(--white)] px-4 py-3 md:hidden">
          <SearchBar compact onSubmitSearch={goSearch} />
        </div>
      ) : null}
    </header>
  )
}
