// src/components/home/DowryPackagesSection.tsx

import { Link } from 'react-router-dom'
import { SectionHeader } from './SectionHeader'

const PACKAGES = [
  {
    id: 1,
    title: 'Accord Çeyiz Paketi',
    badge: 'Peşin Fiyatına 6 Taksit',
    slug: 'accord-ceyiz-paketi',
    date: 'Son Tarih: 30.04.2026',
    images: [
      encodeURI('/products/ceyizpaketleri/çeyiz1.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz2.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz3.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz11.jpg'),
    ],
  },
  {
    id: 2,
    title: 'Elite Çeyiz Paketi',
    badge: 'Peşin Fiyatına 6 Taksit',
    slug: 'elite-ceyiz-paketi',
    date: 'Son Tarih: 30.04.2026',
    images: [
      encodeURI('/products/ceyizpaketleri/çeyiz13.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz14.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz21.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz23.jpg'),
    ],
  },
  {
    id: 3,
    title: 'Prestige Çeyiz Paketi',
    badge: 'Peşin Fiyatına 6 Taksit',
    slug: 'prestige-ceyiz-paketi',
    date: 'Son Tarih: 30.04.2026',
    images: [
      encodeURI('/products/ceyizpaketleri/çeyiz24.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz32.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz33.jpg'),
      encodeURI('/products/ceyizpaketleri/çeyiz34.jpg'),
    ],
  },
]

export function DowryPackagesSection() {
  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="mx-auto max-w-[1280px] px-4">
        <SectionHeader title="Çeyiz Paketleri" linkTo="/kategori/ceyiz-paketleri" />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="group flex flex-col rounded-2xl bg-[var(--white)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-[var(--border)]/50"
            >
              {/* Üst Bilgi */}
              <div className="flex items-center justify-between font-body text-[13px]">
                <h3 className="font-semibold text-[var(--dark)]">{pkg.title}</h3>
                <span className="rounded-full bg-[#189643] px-3 py-1 font-semibold text-white tracking-wide text-[10px] uppercase shadow-sm">
                  {pkg.badge}
                </span>
              </div>

              {/* Görsel Kolajı */}
              <div className="relative mt-6 rounded-xl bg-[#F0EBE3]/30 p-4">
                <p className="absolute inset-x-0 top-6 text-center font-heading text-lg font-bold tracking-widest text-[var(--dark)] opacity-40">
                  {pkg.title.toUpperCase()}
                </p>
                <div className="relative z-10 grid grid-cols-4 gap-2 pt-14">
                  {pkg.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-[1/2] w-full overflow-hidden rounded-md shadow-sm transition-transform duration-500 group-hover:scale-105"
                    >
                      <img src={img} alt="Çeyiz Paket İçeriği" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA ve Alt Bilgi */}
              <Link
                to={`/kategori/${pkg.slug}`}
                className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#333333] py-3.5 font-body text-[13px] font-medium tracking-wide text-white transition-colors hover:bg-[var(--dark)]"
              >
                Çeyiz Paketini Oluştur
              </Link>
              <p className="mt-4 font-body text-[11px] text-[var(--mid)]">
                {pkg.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
