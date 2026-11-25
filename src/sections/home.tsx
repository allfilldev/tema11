import Image from 'next/image';
import Link from 'next/link';
import { Diamond } from '@/components/Diamond';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/content/products';
import { bespokeSteps, clients, crafts, moments, perks } from '@/content/site';
import { rupiah } from '@/lib/utils';

export function Hero() {
  const feat = products[0];
  return (
    <section className="relative flex min-h-[760px] flex-col overflow-hidden sm:min-h-[820px]">
      <Image src="/images/hero.webp" alt="" fill priority sizes="100vw" className="object-cover object-[70%_center]" />
      <div className="relative container-page flex flex-1 flex-wrap items-end justify-between gap-8 pt-36 pb-14">
        <div className="max-w-2xl flex-[1_1_520px]">
          <p className="kicker mb-5 flex items-center gap-2.5"><Diamond full />Koleksi Musim Ini</p>
          <h1 className="display text-[52px] leading-[0.98] sm:text-7xl lg:text-[104px]">
            Seni memberi, <em className="text-gold-deep">dikurasi</em> dengan hati.
          </h1>
          <p className="mt-6 mb-9 max-w-md text-base text-ink-2">Hampers dan hadiah premium untuk momen yang layak dikenang. Dirangkai tangan, dikirim dengan sarung tangan putih.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/koleksi" className="btn btn-gold">Jelajahi Koleksi</Link>
            <Link href="/bespoke" className="btn glass hover:bg-white/80">Rancang Hampers</Link>
          </div>
        </div>
        <Link href={`/produk/${feat.slug}`} className="glass flex flex-[0_1_340px] items-center gap-4 rounded-3xl border-gold/75 p-3.5">
          <Image src={feat.images[0]} alt={feat.name} width={96} height={96} className="size-24 shrink-0 rounded-2xl object-cover" />
          <span className="min-w-0 flex-1">
            <span className="kicker block text-[11px] tracking-[0.22em]">{feat.tag}</span>
            <span className="display my-0.5 block text-2xl">{feat.name}</span>
            <span className="text-sm text-ink-2">{rupiah(feat.boxes[0].price)}</span>
          </span>
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold"><Icon name="arrowUpRight" size={16} /></span>
        </Link>
      </div>
    </section>
  );
}

export function PerkBand() {
  return (
    <section className="bg-gold">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-3 py-5 text-[13px] font-semibold tracking-[0.04em] lg:grid-cols-4">
        {perks.map((p) => (
          <li key={p} className="flex items-center justify-center gap-2.5 text-center"><Diamond className="shrink-0" />{p}</li>
        ))}
      </ul>
    </section>
  );
}

export function Signature() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="mb-12 text-center">
        <p className="kicker mb-2.5">Signature</p>
        <span className="mx-auto mb-4 block h-0.5 w-12 bg-gold" />
        <h2 className="display text-[40px] sm:text-[58px]">Koleksi Pilihan</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {products.filter((p) => p.featured).map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
      <div className="mt-12 text-center">
        <Link href="/koleksi" className="btn border border-ink hover:bg-ink hover:text-white">Lihat Semua Koleksi</Link>
      </div>
    </section>
  );
}

export function Moments() {
  return (
    <section id="momen" className="scroll-mt-28 bg-pearl">
      <div className="container-page py-20 sm:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker mb-2.5">Untuk Setiap Momen</p>
            <h2 className="display text-[40px] sm:text-[58px]">Belanja berdasarkan momen</h2>
          </div>
          <p className="max-w-sm text-ink-2">Setiap momen punya kurasi sendiri, dari kotak hingga warna pita.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {moments.map((m) => (
            <Link key={m.id} href={`/koleksi?momen=${m.id}`} className="group relative flex aspect-[3/4] items-end overflow-hidden rounded-3xl p-2.5 sm:p-3.5">
              <Image src={m.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="glass relative flex w-full items-center justify-between gap-2 rounded-2xl px-3.5 py-3 sm:px-4.5 sm:py-4">
                <span>
                  <span className="display block text-[22px] sm:text-[28px]">{m.name}</span>
                  <span className="hidden text-xs text-ink-2 sm:block">{m.desc}</span>
                </span>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gold sm:size-10"><Icon name="arrowRight" size={15} /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BespokeTeaser() {
  return (
    <section className="relative overflow-hidden">
      <Image src="/images/bespoke.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="relative container-page py-20 sm:py-32">
        <div className="glass max-w-xl rounded-[32px] p-7 sm:p-12">
          <p className="kicker mb-3">Layanan Bespoke</p>
          <h2 className="display mb-4 text-4xl sm:text-[52px]">Rancang hampers Anda sendiri.</h2>
          <p className="mb-7 text-ink-2">Pilih kotak, isi, dan sentuhan akhirnya. Kurator kami membantu hingga hadiah tiba di tangan penerima.</p>
          <ol className="mb-8 space-y-2.5">
            {bespokeSteps.map((s) => (
              <li key={s.no} className="flex items-center gap-4 rounded-2xl border border-white/95 bg-white/70 px-4 py-3.5">
                <span className="display inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-xl font-semibold">{s.no}</span>
                <span><strong className="block text-[15px] font-semibold">{s.title}</strong><span className="text-[13px] text-muted">{s.desc}</span></span>
              </li>
            ))}
          </ol>
          <Link href="/bespoke" className="btn btn-gold">Mulai Merancang</Link>
        </div>
      </div>
    </section>
  );
}

export function Craft() {
  return (
    <section className="container-page flex flex-wrap items-center gap-x-22 gap-y-12 py-20 sm:py-28">
      <div className="relative min-w-0 flex-[1_1_480px]">
        <Image src="/images/keahlian.webp" alt="Proses merangkai hampers di studio Semara" width={1400} height={1000} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[7/5] w-full rounded-[28px] object-cover" />
        <div className="glass absolute right-4 bottom-4 max-w-60 rounded-[20px] px-5 py-4 sm:right-5 sm:bottom-5">
          <span className="display block text-[22px] text-gold-deep italic">Diperiksa dua kali</span>
          <span className="text-[13px] text-ink-2">sebelum setiap kotak ditutup</span>
        </div>
      </div>
      <div className="min-w-0 flex-[1_1_400px]">
        <p className="kicker mb-3">Keahlian</p>
        <h2 className="display mb-4 text-4xl sm:text-[52px]">Dirangkai tangan di studio kami.</h2>
        <p className="mb-8 text-ink-2">Kotak kayu berlapis kain, pita sutra, dan isi yang kami pilih langsung dari perajin lokal.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {crafts.map((c) => (
            <div key={c.title} className="rounded-[18px] border border-line border-t-[3px] border-t-gold bg-white p-4.5">
              <Diamond full size={18} className="text-gold-2" />
              <span className="display mt-2.5 block text-[21px]">{c.title}</span>
              <span className="text-xs text-muted">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CorporateBand() {
  return (
    <section className="px-3 sm:px-8">
      <div className="relative mx-auto max-w-[86rem] overflow-hidden rounded-[36px]">
        <Image src="/images/corporate.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="relative flex justify-center px-4 py-18 sm:py-30">
          <div className="glass max-w-3xl rounded-[32px] p-7 text-center sm:p-13">
            <p className="kicker mb-3">Corporate Concierge</p>
            <h2 className="display mb-4 text-[34px] sm:text-[52px]">Hadiah untuk klien terpenting Anda, dengan identitas brand Anda.</h2>
            <p className="mx-auto mb-8 max-w-md text-ink-2">Kotak berembos logo, kurasi isi sesuai budget, dan pengiriman ke ratusan alamat dengan laporan per penerima.</p>
            <Link href="/corporate" className="btn btn-gold">Jadwalkan Konsultasi</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Clients() {
  return (
    <section className="container-page flex flex-wrap items-center justify-center gap-x-14 gap-y-5 pt-16">
      <span className="text-[11px] font-semibold tracking-[0.3em] text-faint uppercase">Dipercaya oleh</span>
      {clients.map((c) => (
        <span key={c} className="font-serif text-2xl tracking-[0.08em] text-[#8a8d94]">{c}</span>
      ))}
    </section>
  );
}
