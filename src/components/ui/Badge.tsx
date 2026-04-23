// src/components/ui/Badge.tsx

import type { ReactNode } from 'react'

export type BadgeVariant = 'accent' | 'dark' | 'outline'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'accent', className = '' }: BadgeProps) {
  const base =
    'inline-flex items-center justify-center px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em]'
  const styles: Record<BadgeVariant, string> = {
    accent: 'bg-[var(--accent)] text-[var(--white)]',
    dark: 'bg-[var(--dark)] text-[var(--white)]',
    outline: 'border border-[var(--border)] bg-[var(--white)] text-[var(--mid)]',
  }
  return <span className={`${base} ${styles[variant]} ${className}`.trim()}>{children}</span>
}
