// src/components/home/PromoBanners.tsx

import { useNavigate } from 'react-router-dom'

interface PromoCardProps {
  className: string
  tagClass: string
  tag: string
  title: string
  linkClass: string
  slug: string
}

function PromoCard({ className, tagClass, tag, title, linkClass, slug }: PromoCardProps) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate(`/kategori/${slug}`)}
      className={`relative flex h-full w-full flex-col justify-end overflow-hidden border border-[var(--border)] p-5 text-left ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
        aria-hidden
      />
      <div className="relative z-[1]">
        <span
          className={`inline-block font-body text-[10px] font-semibold uppercase tracking-[0.14em] ${tagClass}`}
        >
          {tag}
        </span>
        <h3 className="mt-2 font-heading text-[22px] font-medium leading-tight text-[var(--white)] sm:text-[24px]">
          {title}
        </h3>
        <span
          className={`mt-3 inline-block font-body text-[11px] font-semibold uppercase tracking-[0.12em] ${linkClass}`}
        >
          Keşfet →
        </span>
      </div>
    </button>
  )
}

export function PromoBanners() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr] md:grid-rows-2 md:gap-4">
        <div className="min-h-[200px] md:row-span-2">
          <PromoCard
            className="min-h-[200px] bg-[#2A3628]"
            tagClass="text-[#c8e6c9]"
            tag="Sürdürülebilir Mutfak"
            title="Bambu Kesme Tahtası ve Servis Koleksiyonu"
            linkClass="text-[#c8e6c9]"
            slug="bambu-urunler"
          />
        </div>
        <div className="min-h-[92px]">
          <PromoCard
            className="min-h-[92px] bg-[#2B2535]"
            tagClass="text-[#e1bee7]"
            tag="Sofra Şıklığı"
            title="Beyaz Porselen Yemek Takımları"
            linkClass="text-[#e1bee7]"
            slug="beyaz-porselen"
          />
        </div>
        <div className="min-h-[92px]">
          <PromoCard
            className="min-h-[92px] bg-[#1C2232]"
            tagClass="text-[#90caf9]"
            tag="Retro Seri"
            title="Emaye Çaydanlık ve Tencere Setleri"
            linkClass="text-[#90caf9]"
            slug="emaye-serisi"
          />
        </div>
      </div>
    </section>
  )
}
