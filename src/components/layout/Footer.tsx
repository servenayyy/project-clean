// src/components/layout/Footer.tsx

import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--white)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-heading text-xl font-medium text-[var(--dark)]">Garip Ticaret</p>
          <p className="mt-3 font-body text-[12px] leading-relaxed text-[var(--mid)]">
            Türkiye’nin seçkin ev ve mutfak ürünleri mağazası. Özenle seçilmiş koleksiyonlar,
            güvenli alışveriş ve hızlı teslimat.
          </p>
        </div>
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dark)]">
            Kurumsal
          </p>
          <ul className="mt-3 space-y-2 font-body text-[12px] text-[var(--mid)]">
            <li>
              <Link to="/hakkimizda" className="hover:text-[var(--accent)]" onClick={(e) => e.preventDefault()}>
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link to="/iletisim" className="hover:text-[var(--accent)]" onClick={(e) => e.preventDefault()}>
                İletişim
              </Link>
            </li>
            <li>
              <Link to="/magazalar" className="hover:text-[var(--accent)]" onClick={(e) => e.preventDefault()}>
                Mağazalar
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dark)]">
            Müşteri Hizmetleri
          </p>
          <ul className="mt-3 space-y-2 font-body text-[12px] text-[var(--mid)]">
            <li>
              <Link to="/iade" className="hover:text-[var(--accent)]" onClick={(e) => e.preventDefault()}>
                İade ve Değişim
              </Link>
            </li>
            <li>
              <Link to="/kargo" className="hover:text-[var(--accent)]" onClick={(e) => e.preventDefault()}>
                Kargo Bilgisi
              </Link>
            </li>
            <li>
              <Link to="/sss" className="hover:text-[var(--accent)]" onClick={(e) => e.preventDefault()}>
                Sıkça Sorulan Sorular
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--dark)]">
            Bülten
          </p>
          <p className="mt-3 font-body text-[12px] text-[var(--mid)]">
            Yeni koleksiyon ve kampanyalardan haberdar olun.
          </p>
          <form
            className="mt-3 flex border border-[var(--border)]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="min-w-0 flex-1 border-0 bg-[var(--bg)] px-3 py-2 font-body text-[12px] outline-none"
            />
            <button
              type="submit"
              className="bg-[var(--dark)] px-3 font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--white)]"
            >
              Kayıt
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-4 text-center font-body text-[11px] text-[var(--mid)]">
        © {new Date().getFullYear()} Garip Ticaret. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}
