// src/components/ui/CategoryChips.tsx

import type { CategoryDto } from '../../types'

export interface CategoryChipsProps {
  categories: CategoryDto[]
  activeSlug: string
  onChange: (slug: string) => void
}

export function CategoryChips({ categories, activeSlug, onChange }: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange('')}
        className={`border px-3 py-2 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
          activeSlug === ''
            ? 'border-[var(--dark)] bg-[var(--dark)] text-[var(--white)]'
            : 'border-[var(--border)] bg-[var(--white)] text-[var(--mid)] hover:border-[var(--dark)] hover:bg-[var(--dark)] hover:text-[var(--white)]'
        }`}
      >
        Tümü
      </button>
      {categories.map((c) => {
        const active = activeSlug === c.slug
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.slug)}
            className={`border px-3 py-2 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${
              active
                ? 'border-[var(--dark)] bg-[var(--dark)] text-[var(--white)]'
                : 'border-[var(--border)] bg-[var(--white)] text-[var(--mid)] hover:border-[var(--dark)] hover:bg-[var(--dark)] hover:text-[var(--white)]'
            }`}
          >
            {c.name}
          </button>
        )
      })}
    </div>
  )
}
