import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHero } from '@/components/PageHero';
import { Moments } from '@/sections/home';
import { Catalog } from './Catalog';

export const metadata: Metadata = {
  title: 'Koleksi Hampers & Hadiah Premium',
  description: 'Koleksi hampers dan hadiah premium Semara untuk pernikahan, ulang tahun, corporate, dan hari raya.',
  alternates: { canonical: '/koleksi' },
};

export default function KoleksiPage() {
  return (
    <>
      <PageHero
        image="/images/hero-2.webp"
        kicker="Koleksi"
        title={<>Hadiah yang <em className="text-gold-deep">diingat</em></>}
        text="Setiap hampers dirangkai tangan, lengkap dengan kartu tulisan tangan dan kotak yang layak disimpan."
        crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Koleksi' }]}
      />
      <Suspense fallback={<div className="container-page min-h-[60vh] py-14 text-muted">Memuat koleksi…</div>}>
        <Catalog />
      </Suspense>
      <Moments />
    </>
  );
}
