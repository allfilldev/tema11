import type { Metadata } from 'next';
import { Diamond } from '@/components/Diamond';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/content/products';
import { corporateServices, faqs } from '@/content/site';
import { Clients } from '@/sections/home';
import { Testimonials } from '@/sections/Testimonials';
import { CorporateForm } from './CorporateForm';

export const metadata: Metadata = {
  title: 'Corporate Concierge',
  description: 'Hadiah corporate premium dengan kotak berembos logo, kurasi sesuai budget, dan pengiriman ke banyak alamat dengan laporan per penerima.',
  alternates: { canonical: '/corporate' },
};

export default function CorporatePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <PageHero
        image="/images/corporate.webp"
        kicker="Corporate Concierge"
        title={<>Hadiah dengan <em className="text-gold-deep">identitas</em> brand Anda</>}
        text="Untuk klien, mitra, dan tim. Satu kurator menangani dari proposal sampai laporan pengiriman."
        crumbs={[{ label: 'Beranda', href: '/' }, { label: 'Corporate' }]}
      />
      <Clients />

      <section className="container-page py-20 sm:py-24">
        <div className="mb-10 text-center">
          <p className="kicker mb-2.5">Layanan</p>
          <h2 className="display text-[40px] sm:text-[52px]">Semua ditangani satu kurator</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {corporateServices.map((s) => (
            <div key={s.title} className="rounded-3xl border border-line border-t-[3px] border-t-gold bg-white p-6">
              <Diamond full size={20} className="text-gold-2" />
              <h3 className="display mt-3 mb-1.5 text-2xl">{s.title}</h3>
              <p className="text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-pearl">
        <div className="container-page py-20">
          <div className="mb-10 text-center">
            <p className="kicker mb-2.5">Pilihan Populer</p>
            <h2 className="display text-[40px] sm:text-5xl">Favorit untuk corporate</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {products.filter((p) => p.moments.includes('corporate')).slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section id="konsultasi" className="container-page scroll-mt-28 py-20 sm:py-24">
        <div className="flex flex-wrap gap-x-16 gap-y-10">
          <div className="min-w-0 flex-[1_1_320px]">
            <p className="kicker mb-3">Jadwalkan Konsultasi</p>
            <h2 className="display mb-4 text-4xl sm:text-5xl">Ceritakan kebutuhan Anda.</h2>
            <p className="text-ink-2">Kurator kami membalas lewat WhatsApp dengan proposal isi, mockup logo, dan harga per paket dalam 1x24 jam kerja.</p>
          </div>
          <CorporateForm />
        </div>
      </section>

      <Testimonials />

      <section id="faq" className="container-page scroll-mt-28 max-w-3xl pb-24">
        <h2 className="display mb-6 text-center text-[40px]">Pertanyaan umum</h2>
        <div className="border-t border-line">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-line">
              <summary className="flex min-h-15 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-medium">
                {f.q}
                <span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
