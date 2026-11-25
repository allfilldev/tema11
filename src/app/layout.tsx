import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartProvider';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { site } from '@/content/site';
import './globals.css';

// Font di-self-host di repo (tidak bergantung ke Google Fonts saat build).
const manrope = localFont({ src: '../fonts/Manrope-Variable.woff2', weight: '200 800', variable: '--font-manrope', display: 'swap' });
const cormorant = localFont({
  src: [
    { path: '../fonts/Cormorant-Variable.woff2', weight: '300 700', style: 'normal' },
    { path: '../fonts/Cormorant-Italic-Variable.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.fullName} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: 'website', locale: 'id_ID', siteName: site.fullName },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#ffffff' };

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: site.fullName,
  description: site.description,
  url: site.url,
  email: site.contact.email,
  telephone: `+${site.contact.whatsapp}`,
  address: { '@type': 'PostalAddress', streetAddress: site.contact.address, addressLocality: site.city, addressCountry: 'ID' },
  sameAs: [site.contact.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <CartProvider>
          <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
            Langsung ke konten
          </a>
          <Header />
          <main id="konten">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
