// src/components/layout/DrawerMenu.tsx

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronRight } from 'lucide-react'

import { fetchCategoryMenu } from '../../api/categoryApi'
import { useUiStore } from '../../store/uiStore'

import type { CategoryMenuDto } from '../../types'

export function DrawerMenu() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen)
  const toggleSidebar = useUiStore((s) => s.toggleSidebar)
  
  const [items, setItems] = useState<CategoryMenuDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const data = await fetchCategoryMenu()
        if (!cancelled) setItems(data)
      } catch (e) {
        console.error('Menu load error', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[320px] flex-col overflow-y-auto bg-[var(--white)] shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] sm:w-[380px] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Ana Menü"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <span className="font-heading text-xl font-semibold tracking-wide text-[var(--dark)]">
            MENU
          </span>
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--mid)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--dark)]"
            aria-label="Menüyü Kapat"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 px-6 py-4">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/"
                onClick={toggleSidebar}
                className="group flex w-full items-center justify-between border-b border-[var(--border)] py-4 font-body text-[14px] font-semibold tracking-[0.05em] text-[var(--dark)] transition-colors hover:text-[var(--accent)]"
              >
                ★ ANA SAYFA
              </Link>
            </li>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <li key={`skeleton-${i}`} className="py-4">
                  <div className="h-4 w-32 animate-pulse bg-gray-200" />
                </li>
              ))
            ) : (
              items.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/kategori/${cat.slug}`}
                    onClick={toggleSidebar}
                    className="group flex w-full items-center justify-between py-4 font-body text-[14px] font-medium tracking-wide text-[var(--dark)] transition-transform duration-300 hover:translate-x-2 hover:text-[var(--accent)]"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight size={18} className="text-[var(--mid)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                  {cat.children.length > 0 ? (
                    <ul className="mb-2 ml-4 flex flex-col gap-1 border-l-2 border-[var(--bg)] pl-3">
                      {cat.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            to={`/kategori/${child.slug}`}
                            onClick={toggleSidebar}
                            className="block py-2 font-body text-[13px] text-[var(--mid)] transition-colors hover:text-[var(--accent)]"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))
            )}
          </ul>
        </nav>
      </aside>
    </>
  )
}
