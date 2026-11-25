import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Builder } from './Builder';

export const metadata: Metadata = {
  title: 'Rancang Hampers Bespoke',
  description: 'Rancang hampers Anda sendiri: pilih kotak, ukuran, isi, dan sentuhan akhir. Dirangkai tangan oleh kurator Semara.',
  alternates: { canonical: '/bespoke' },
};

export default function BespokePage() {
  return (
    <>
      <PageHero
        image="/images/bespoke.webp"
        kicker="Layanan Bespoke"
        title={<>Rancang hampers <em className="text-gold-deep">Anda sendiri</em></>}
        text="Pilih kotak, ukuran, dan isinya. Harga terhitung otomatis, kurator kami merangkainya dalam 3 sampai 5 hari kerja."
        crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Bespoke' }]}
      />
      <Builder />
    </>
  );
}
