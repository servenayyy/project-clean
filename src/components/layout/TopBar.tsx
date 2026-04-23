// src/components/layout/TopBar.tsx

export function TopBar() {
  return (
    <div className="bg-[var(--dark)] text-[var(--white)]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2.5 text-center font-body text-[11px] tracking-[0.05em] text-white/80 sm:justify-between sm:text-left">
        <span>Destek Hattı: 0 (212) 555 01 23</span>
        <span className="hidden opacity-50 sm:inline">|</span>
        <span>Ücretsiz Kargo: 1.000₺ ve üzeri siparişlerde</span>
      </div>
    </div>
  )
}
