'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HIDE_LAYOUT_ROUTES = ['/login', '/signup', '/register'];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = HIDE_LAYOUT_ROUTES.some((route) => pathname.startsWith(route));

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
