// src/components/ui/Button.tsx

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'accent' | 'gold' | 'ghost' | 'dark'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'accent',
  fullWidth,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center border border-transparent px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-50'
  const variants: Record<ButtonVariant, string> = {
    accent: 'bg-[var(--accent)] text-[var(--white)] hover:opacity-90',
    gold: 'bg-[var(--gold)] text-[var(--dark)] hover:opacity-90',
    ghost:
      'bg-transparent text-[var(--white)] border border-white/30 hover:border-white/60',
    dark: 'bg-[var(--dark)] text-[var(--white)] hover:bg-[#2a2620]',
  }
  const w = fullWidth ? 'w-full' : ''
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${w} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}
