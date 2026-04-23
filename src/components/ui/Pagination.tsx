// src/components/ui/Pagination.tsx

export interface PaginationProps {
  pageNumber: number
  totalPages: number
  onPageChange: (nextPage: number) => void
  className?: string
}

export function Pagination({
  pageNumber,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null

  const canPrev = pageNumber > 0
  const canNext = pageNumber < totalPages - 1

  return (
    <nav
      className={`mt-8 flex items-center justify-center gap-3 ${className}`.trim()}
      aria-label="Sayfalama"
    >
      <button
        type="button"
        disabled={!canPrev}
        onClick={() => onPageChange(pageNumber - 1)}
        className="border border-[var(--border)] bg-[var(--white)] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--dark)] transition-colors hover:border-[var(--dark)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Önceki
      </button>
      <span className="font-body text-xs text-[var(--mid)]">
        Sayfa {pageNumber + 1} / {totalPages}
      </span>
      <button
        type="button"
        disabled={!canNext}
        onClick={() => onPageChange(pageNumber + 1)}
        className="border border-[var(--border)] bg-[var(--white)] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--dark)] transition-colors hover:border-[var(--dark)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sonraki
      </button>
    </nav>
  )
}
