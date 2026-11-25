'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, navRight, site } from '@/content/site';
import { cn } from '@/lib/utils';
import { useCart } from './CartProvider';
import { Icon } from './Icon';
import { Logo } from './Logo';

const allLinks = [...nav, ...navRight];

function isActive(pathname: string, href: string) {
  const path = href.split('#')[0];
  if (href.includes('#')) return false;
  if (path === '/koleksi') return pathname === '/koleksi' || pathname.startsWith('/produk/');
  return pathname === path;
}

export function Header() {
  const pathname = usePathname();
  const { count, ready, setDrawerOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkCls = (href: string) =>
    cn('relative py-2 transition-colors hover:text-gold-text', isActive(pathname, href) && 'text-gold-text after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:bg-gold');

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 px-3 pt-4 sm:px-6 sm:pt-5">
        <header className={cn('glass mx-auto flex max-w-[82.5rem] items-center justify-between gap-4 rounded-full py-2 pr-2 pl-3 sm:pl-6', scrolled && 'bg-white/80')}>
          <nav aria-label="Navigasi utama" className="flex flex-1 items-center gap-7 text-xs font-medium tracking-[0.18em] uppercase">
            <button type="button" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(true)} className="inline-flex size-11 items-center justify-center lg:-ml-3">
              <Icon name="menu" size={20} stroke={1.3} />
            </button>
            {nav.map((n) => (
              <Link key={n.label} href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined} className={cn('hidden lg:inline-block', linkCls(n.href))}>{n.label}</Link>
            ))}
          </nav>
          <Logo priority className="h-10 sm:h-12" />
          <div className="flex flex-1 items-center justify-end gap-1 text-xs font-medium tracking-[0.18em] uppercase">
            {navRight.map((n) => (
              <Link key={n.label} href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined} className={cn('mr-3 hidden lg:inline-block', linkCls(n.href))}>{n.label}</Link>
            ))}
            <Link href="/koleksi" aria-label="Cari hadiah" className="hidden size-11 items-center justify-center rounded-full sm:inline-flex">
              <Icon name="search" size={18} stroke={1.4} />
            </Link>
            <button type="button" onClick={() => setDrawerOpen(true)} aria-label={`${ready ? count : 0} item di tas belanja`} className="relative inline-flex size-11 items-center justify-center rounded-full bg-gold text-ink transition-colors hover:bg-gold-2">
              <Icon name="bag" size={17} stroke={1.5} />
              {ready && count > 0 && <span className="absolute -top-0.5 -right-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] text-white">{count}</span>}
            </button>
          </div>
        </header>
      </div>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Tutup menu" className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="glass absolute inset-y-3 left-3 flex w-[min(380px,calc(100%-24px))] flex-col rounded-[28px] bg-white/85 p-6">
            <div className="flex items-center justify-between">
              <Logo className="h-11" />
              <button type="button" aria-label="Tutup menu" onClick={() => setOpen(false)} className="inline-flex size-11 items-center justify-center rounded-full border border-line">
                <Icon name="close" size={18} />
              </button>
            </div>
            <ul className="mt-8 flex-1">
              {[{ label: 'Beranda', href: '/' }, ...allLinks, { label: 'Tas Belanja', href: '/tas' }].map((n) => (
                <li key={n.label} className="border-b border-line">
                  <Link href={n.href} className={cn('display flex min-h-15 items-center justify-between text-[28px]', isActive(pathname, n.href) && 'text-gold-deep')}>
                    {n.label}
                    <Icon name="right" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-1 text-sm text-muted">
              <p>{site.contact.whatsappDisplay}</p>
              <p>{site.contact.hours}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
