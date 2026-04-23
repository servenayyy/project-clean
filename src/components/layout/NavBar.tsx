// src/components/layout/NavBar.tsx

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { fetchCategoryMenu } from '../../api/categoryApi'

import type { CategoryMenuDto } from '../../types'

export function NavBar() {
  const location = useLocation()
  const [items, setItems] = useState<CategoryMenuDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openSlug, setOpenSlug] = useState<string | null>(null)

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
          setError(e instanceof Error ? e.message : 'Menü yüklenemedi.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const pathParts = location.pathname.split('/').filter(Boolean)
  const activeSlug =
    pathParts[0] === 'kategori' && pathParts[1] ? pathParts[1] : null
  const isHome = location.pathname === '/'

  return (
    <nav
      className="border-b border-[var(--border)] bg-[var(--white)]"
      aria-label="Kategori menüsü"
    >
      <div className="mx-auto max-w-[1280px] px-4">
        {error ? (
          <p className="py-2 font-body text-xs text-[var(--accent)]">{error}</p>
        ) : null}
        <ul className="flex h-11 items-center gap-1 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <Link
              to="/"
              className={`inline-flex h-13 items-center border-b-2 px-4 font-body text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                isHome
                  ? 'border-[var(--accent)] text-[var(--dark)]'
                  : 'border-transparent text-[var(--dark)] hover:text-[var(--accent)]'
              }`}
            >
              ★ Tüm Ürünler
            </Link>
          </li>
          
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="shrink-0 px-3">
                  <span className="inline-block h-3 w-16 animate-pulse bg-gray-200" />
                </li>
              ))
            : items.map((cat) => {
                const hasChildren = cat.children.length > 0
                const active = activeSlug === cat.slug
                const submenuOpen = openSlug === cat.slug

                return (
                  <li
                    key={cat.id}
                    className="group relative shrink-0"
                    onMouseEnter={() => hasChildren && setOpenSlug(cat.slug)}
                    onMouseLeave={() => setOpenSlug(null)}
                  >
                    <Link
                      to={`/kategori/${cat.slug}`}
                      className={`inline-flex h-13 items-center border-b-2 px-4 font-body text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                        active
                          ? 'border-[var(--accent)] text-[var(--dark)]'
                          : 'border-transparent text-[var(--dark)] hover:text-[var(--accent)]'
                      }`}
                    >
                      {cat.name}
                      {hasChildren ? (
                        <span className="ml-1 text-[10px] text-[var(--mid)]">▾</span>
                      ) : null}
                    </Link>
                    {hasChildren && submenuOpen ? (
                      <div className="absolute left-0 top-full z-50 min-w-[200px] border border-[var(--border)] bg-[var(--white)] shadow-sm">
                        {cat.children.map((ch) => (
                          <Link
                            key={ch.id}
                            to={`/kategori/${ch.slug}`}
                            className="block border-b border-[var(--border)] px-4 py-2 font-body text-[12px] text-[var(--dark)] last:border-b-0 hover:bg-[var(--bg)]"
                          >
                            {ch.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </li>
                )
              })}
        </ul>
      </div>
    </nav>
  )
}
