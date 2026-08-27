import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthModal } from '@/components/AuthModal';
import { CompareDock } from '@/components/CompareDock';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'ZenEstate | Build Your Future, One Property at a Time',
  description: 'Discover curated properties with the best value. Architectural houses, apartments, and modern sanctuaries with verified premier agents.',
  keywords: ['real estate', 'house', 'apartment', 'mortgage calculator', 'property list', 'real estate agents'],
  authors: [{ name: 'ZenEstate Group' }],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'ZenEstate | Build Your Future, One Property at a Time',
    description: 'Discover curated properties with the best value. Architectural houses, apartments, and modern sanctuaries.',
    images: [{ url: '/logo.png', width: 600, height: 600, alt: 'ZenEstate Logo' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} light antialiased`}>
      <body className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <AuthModal />
          <CompareDock />
        </AppProvider>
      </body>
    </html>
  );
}
