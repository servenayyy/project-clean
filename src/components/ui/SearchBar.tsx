// src/components/ui/SearchBar.tsx

import { type FormEvent, useState } from 'react'

export interface SearchBarProps {
  placeholder?: string
  defaultValue?: string
  onSubmitSearch: (query: string) => void
  className?: string
  compact?: boolean
}

export function SearchBar({
  placeholder = 'Ürün, koleksiyon veya marka ara…',
  defaultValue = '',
  onSubmitSearch,
  className = '',
  compact,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmitSearch(value.trim())
  }

  const pad = compact ? 'py-2 pl-3 pr-10' : 'py-2.5 pl-4 pr-12'

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full max-w-xl ${className}`.trim()}
      role="search"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-[var(--border)] bg-[var(--white)] font-body text-sm text-[var(--dark)] outline-none placeholder:text-[var(--mid)] focus:border-[var(--dark)] ${pad}`}
        aria-label="Arama"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 flex h-full items-center justify-center px-3 text-[var(--mid)] hover:text-[var(--dark)]"
        aria-label="Ara"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  )
}
