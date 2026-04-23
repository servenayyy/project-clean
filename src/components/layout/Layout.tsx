// src/components/layout/Layout.tsx

import { Outlet } from 'react-router-dom'

import { Footer } from './Footer'
import { Header } from './Header'
import { NavBar } from './NavBar'
import { TopBar } from './TopBar'
import { DrawerMenu } from './DrawerMenu'
import { CartDrawer } from '../cart/CartDrawer'
import { ProfilePanel } from '../profile/ProfilePanel'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--dark)]">
      <DrawerMenu />
      <CartDrawer />
      <ProfilePanel />
      <TopBar />
      <Header />
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
