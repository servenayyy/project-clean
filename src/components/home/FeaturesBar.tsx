// src/components/home/FeaturesBar.tsx

const ITEMS = [
  {
    title: 'Ücretsiz Kargo',
    desc: '1.000₺ üzeri siparişlerde Türkiye geneli.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" />
        <path d="M16 8h5l3 5v5h-6" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Kolay İade',
    desc: '14 gün içinde ücretsiz iade ve değişim.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
  },
  {
    title: 'Güvenli Ödeme',
    desc: '3D Secure ve SSL ile korunan ödeme altyapısı.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Orijinal Ürün',
    desc: 'Tüm ürünler distribütör ve marka garantilidir.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
] as const

export function FeaturesBar() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--white)] py-10">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 border border-[var(--border)] bg-[var(--bg)] p-4"
          >
            <div className="text-[var(--gold)]">{item.icon}</div>
            <div>
              <p className="font-body text-[13px] font-semibold text-[var(--dark)]">{item.title}</p>
              <p className="mt-1 font-body text-[12px] leading-relaxed text-[var(--mid)]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
