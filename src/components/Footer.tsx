import Link from 'next/link';
import { site } from '@/content/site';
import { WA_CONTACT_URL } from '@/lib/utils';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';

const shop = [
  { label: 'Koleksi', href: '/koleksi' },
  { label: 'Pernikahan', href: '/koleksi?momen=pernikahan' },
  { label: 'Ulang Tahun', href: '/koleksi?momen=ulang-tahun' },
  { label: 'Hari Raya', href: '/koleksi?momen=hari-raya' },
  { label: 'Bespoke', href: '/bespoke' },
];
const service = [
  { label: 'Corporate', href: '/corporate' },
  { label: 'Pertanyaan Umum', href: '/corporate#faq' },
  { label: 'Tas Belanja', href: '/tas' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-pearl">
      <div className="container-page pt-16 pb-8">
        <div className="glass mb-14 flex flex-wrap items-center justify-between gap-6 rounded-[28px] border-gold/70 bg-white/80 p-6 sm:p-9">
          <div className="max-w-md">
            <h2 className="display mb-1.5 text-[34px]">Bergabung dengan Daftar Privat</h2>
            <p className="text-muted">Akses lebih dulu ke koleksi musiman dan edisi terbatas.</p>
          </div>
          <NewsletterForm />
        </div>
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs flex-[1_1_260px]">
            <Logo className="h-16" />
            <p className="mt-3.5 text-sm text-muted">Gifting house untuk hampers dan hadiah premium. Studio di Semarang, mengirim ke seluruh Indonesia.</p>
          </div>
          <div className="flex flex-wrap gap-x-20 gap-y-10 text-sm text-ink-2">
            <Col title="Belanja" links={shop} />
            <Col title="Layanan" links={service} />
            <div className="flex max-w-64 flex-col gap-2">
              <p className="mb-1 text-[11px] font-semibold tracking-[0.24em] text-gold-text uppercase">Studio</p>
              <a href={WA_CONTACT_URL} className="hover:text-ink">{site.contact.whatsappDisplay}</a>
              <a href={`mailto:${site.contact.email}`} className="hover:text-ink">{site.contact.email}</a>
              <a href={site.contact.maps} target="_blank" rel="noopener noreferrer" className="hover:text-ink">{site.contact.address}</a>
              <span>{site.contact.hours}</span>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-[#e0e2e6] pt-6 text-xs text-faint">
          <span>© 2027 {site.fullName}</span>
          <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Instagram {site.contact.instagramHandle}</a>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="mb-2 text-[11px] font-semibold tracking-[0.24em] text-gold-text uppercase">{title}</p>
      {links.map((l) => (
        <Link key={l.label} href={l.href} className="py-1 hover:text-ink">{l.label}</Link>
      ))}
    </div>
  );
}
