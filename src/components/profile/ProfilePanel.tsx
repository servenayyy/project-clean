// src/components/profile/ProfilePanel.tsx

import { useEffect, useState } from 'react'
import { X, User, LogOut, Package, MapPin, Key } from 'lucide-react'

import { useUiStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'
import type { UserProfileResponse } from '../../types'

export function ProfilePanel() {
  const isOpen = useUiStore((s) => s.profileOpen)
  const toggleProfile = useUiStore((s) => s.toggleProfile)
  const { isAuthenticated, user, logout, setUser } = useAuthStore()

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  // Press ESC to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        toggleProfile()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, toggleProfile])

  // Mock Login func
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated successful login mapping to UserProfileResponse DTO
    const mockUser: UserProfileResponse = {
      id: 1,
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: loginForm.email,
      phone: '0555 555 5555',
      address: {
        city: 'İstanbul',
        district: 'Beşiktaş',
        fullAddress: 'Örnek Mah. Test Sok. No: 1',
        zipCode: '34353',
      },
    }
    setUser(mockUser)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={toggleProfile}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[var(--bg)] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-labelledby="profile-title"
        role="dialog"
        aria-modal="true"
      >
        <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--white)] px-6 py-5">
          <div className="flex items-center gap-3">
            <User size={24} className="text-[var(--dark)]" />
            <h2 id="profile-title" className="font-heading text-lg font-semibold text-[var(--dark)]">
              {isAuthenticated ? 'Hesabım' : 'Giriş Yap'}
            </h2>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--mid)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--dark)]"
            onClick={toggleProfile}
            aria-label="Kapat"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {isAuthenticated && user ? (
            <div className="p-6">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]/10 text-3xl font-bold text-[var(--accent)]">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
                <h3 className="font-heading text-xl font-semibold text-[var(--dark)]">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="mt-1 font-body text-sm text-[var(--mid)]">{user.email}</p>
              </div>

              <nav className="flex flex-col gap-3">
                <button className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-4 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5">
                  <Package className="text-[var(--mid)]" size={20} />
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--dark)]">Siparişlerim</p>
                    <p className="font-body text-xs text-[var(--mid)]">Tüm geçmiş siparişlerinizi görüntüleyin.</p>
                  </div>
                </button>
                <button className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-4 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5">
                  <User className="text-[var(--mid)]" size={20} />
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--dark)]">Profil Bilgilerim</p>
                    <p className="font-body text-xs text-[var(--mid)]">Ad, Soyad ve telefon bilgisi.</p>
                  </div>
                </button>
                <button className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-4 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5">
                  <MapPin className="text-[var(--mid)]" size={20} />
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--dark)]">Adreslerim</p>
                    <p className="font-body text-xs text-[var(--mid)]">Kayıtlı teslimat adresleriniz.</p>
                  </div>
                </button>
                <button className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-4 text-left transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/5">
                  <Key className="text-[var(--mid)]" size={20} />
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--dark)]">Şifre Değiştir</p>
                    <p className="font-body text-xs text-[var(--mid)]">Hesabınızın güvenliğini sağlayın.</p>
                  </div>
                </button>
              </nav>

              <button
                type="button"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#fff1f1] px-4 py-3 font-body text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                onClick={logout}
              >
                <LogOut size={16} /> Çıkış Yap
              </button>
            </div>
          ) : (
            <div className="p-6">
              <p className="mb-8 text-center font-body text-sm text-[var(--mid)]">
                Avantajlı alışverişin keyfini çıkarmak ve siparişlerini kolayca takip etmek için giriş yap.
              </p>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-[var(--dark)]">
                  E-Posta Adresi
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="rounded border border-[var(--border)] bg-[var(--white)] px-4 py-3 font-body text-sm text-[var(--dark)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    placeholder="ornek@email.com"
                  />
                </label>
                <label className="flex flex-col gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-[var(--dark)]">
                  Şifre
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="rounded border border-[var(--border)] bg-[var(--white)] px-4 py-3 font-body text-sm text-[var(--dark)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    placeholder="••••••••"
                  />
                </label>
                <div className="text-right">
                  <a href="#" className="font-body text-xs font-medium text-[var(--mid)] hover:text-[var(--accent)]">
                    Şifremi Unuttum
                  </a>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-[var(--dark)] px-4 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-white shadow-xl transition-transform hover:scale-[1.02] hover:bg-black"
                >
                  Giriş Yap
                </button>
              </form>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-8">
                <span className="font-body text-sm text-[var(--mid)]">Henüz hesabın yok mu?</span>
                <button
                  type="button"
                  className="font-body text-sm font-bold uppercase tracking-widest text-[var(--accent)] hover:text-[#b5955e]"
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
