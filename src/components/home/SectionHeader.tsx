// src/components/home/SectionHeader.tsx

import { Link } from 'react-router-dom'

export interface SectionHeaderProps {
  title: string
  linkTo: string
  linkLabel?: string
}

export function SectionHeader({ title, linkTo, linkLabel = 'Tümünü Gör' }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h2 className="shrink-0 font-heading text-[22px] font-medium text-[var(--dark)] sm:text-[26px]">
        {title}
      </h2>
      <div className="hidden min-w-0 flex-1 border-t border-[var(--border)] sm:block" />
      <Link
        to={linkTo}
        className="shrink-0 font-body text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--accent)] hover:underline"
      >
        {linkLabel} →
      </Link>
    </div>
  )
}
