'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { rupiah } from '@/lib/utils';
import { useCart } from './CartProvider';
import { Icon } from './Icon';
import { QtyInput } from './QtyInput';

export function CartDrawer() {
  const { items, subtotal, drawerOpen, setDrawerOpen, setQty, remove } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Tas belanja">
      <button type="button" aria-label="Tutup tas belanja" className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
      <div className="glass absolute inset-y-3 right-3 flex w-[min(440px,calc(100%-24px))] flex-col rounded-[28px] bg-white/90">
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <p className="display text-3xl">Tas Belanja</p>
          <button type="button" aria-label="Tutup tas belanja" onClick={() => setDrawerOpen(false)} className="inline-flex size-11 items-center justify-center rounded-full border border-line">
            <Icon name="close" size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-muted">Tas belanja Anda masih kosong.</p>
            <Link href="/koleksi" onClick={() => setDrawerOpen(false)} className="btn btn-gold">Jelajahi Koleksi</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-4">
              {items.map((it) => (
                <li key={it.key} className="flex gap-4 rounded-2xl bg-white p-3">
                  <Image src={it.image} alt={it.name} width={84} height={112} className="h-28 w-21 shrink-0 rounded-xl bg-pearl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="display text-xl">{it.name}</p>
                      <button type="button" aria-label={`Hapus ${it.name}`} onClick={() => remove(it.key)} className="-mt-1.5 -mr-1.5 inline-flex size-10 shrink-0 items-center justify-center text-faint hover:text-ink">
                        <Icon name="trash" size={17} />
                      </button>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted">{it.detail}</p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <QtyInput value={it.qty} onChange={(q) => setQty(it.key, q)} small label={it.name} />
                      <span className="text-sm font-semibold">{rupiah(it.price * it.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-6 pt-4 pb-6">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-semibold">{rupiah(subtotal)}</span></div>
              <p className="mt-1 text-xs text-muted">Ongkos kirim dihitung saat konfirmasi.</p>
              <Link href="/tas" onClick={() => setDrawerOpen(false)} className="btn btn-gold mt-4 w-full">Lanjut ke Checkout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
