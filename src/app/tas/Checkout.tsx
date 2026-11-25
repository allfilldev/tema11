'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Icon } from '@/components/Icon';
import { QtyInput } from '@/components/QtyInput';
import { rupiah, waLink } from '@/lib/utils';

const field = 'h-12 w-full rounded-full border border-line bg-white px-5 text-[15px] placeholder:text-faint focus:border-ink focus:outline-none';

export function Checkout() {
  const { items, subtotal, ready, setQty, remove } = useCart();
  const [f, setF] = useState({ pengirim: '', wa: '', penerima: '', alamat: '', kota: '', tanggal: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  if (!ready) return <div className="min-h-[40vh]" />;
  if (!items.length)
    return (
      <div className="py-16 text-center">
        <p className="mb-6 text-muted">Tas belanja Anda masih kosong.</p>
        <Link href="/koleksi" className="btn btn-gold">Jelajahi Koleksi</Link>
      </div>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = items.map((it, i) => `${i + 1}. ${it.name} x${it.qty} = ${rupiah(it.price * it.qty)}\n   ${it.detail}${it.note ? `\n   Kartu: "${it.note}"` : ''}`);
    const text = [
      'Halo Semara, saya ingin memesan:',
      '',
      ...lines,
      '',
      `Subtotal: ${rupiah(subtotal)}`,
      '',
      `Pengirim: ${f.pengirim} (${f.wa})`,
      `Penerima: ${f.penerima}`,
      `Alamat: ${f.alamat}, ${f.kota}`,
      `Tanggal kirim: ${f.tanggal}`,
    ].join('\n');
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap gap-x-14 gap-y-12">
      <ul className="min-w-0 flex-[999_1_560px] space-y-3">
        {items.map((it) => (
          <li key={it.key} className="flex gap-5 rounded-3xl border border-line p-4">
            <Image src={it.image} alt={it.name} width={120} height={160} className="h-32 w-24 shrink-0 rounded-2xl bg-pearl object-cover sm:h-40 sm:w-30" />
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-3">
                <p className="display text-2xl sm:text-[28px]">{it.name}</p>
                <button type="button" aria-label={`Hapus ${it.name}`} onClick={() => remove(it.key)} className="-mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-faint hover:text-ink">
                  <Icon name="trash" size={17} />
                </button>
              </div>
              <p className="text-sm text-muted">{it.detail}</p>
              {it.note && <p className="mt-1 text-sm text-ink-2 italic">Kartu: “{it.note}”</p>}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <QtyInput value={it.qty} onChange={(q) => setQty(it.key, q)} small label={it.name} />
                <span className="font-semibold">{rupiah(it.price * it.qty)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="glass min-w-0 flex-[1_1_360px] self-start rounded-[28px] border-gold/60 bg-pearl/70 p-6 sm:p-8">
        <h2 className="display mb-5 text-3xl">Detail Pengiriman</h2>
        <div className="space-y-4">
          <F id="pengirim" label="Nama pengirim"><input id="pengirim" required value={f.pengirim} onChange={set('pengirim')} className={field} autoComplete="name" /></F>
          <F id="wa" label="WhatsApp pengirim"><input id="wa" required type="tel" inputMode="tel" value={f.wa} onChange={set('wa')} placeholder="08xx" className={field} autoComplete="tel" /></F>
          <F id="penerima" label="Nama penerima"><input id="penerima" required value={f.penerima} onChange={set('penerima')} className={field} /></F>
          <F id="alamat" label="Alamat penerima"><textarea id="alamat" required rows={3} value={f.alamat} onChange={set('alamat')} className="w-full rounded-2xl border border-line bg-white px-5 py-3 text-[15px] focus:border-ink focus:outline-none" /></F>
          <F id="kota" label="Kota"><input id="kota" required value={f.kota} onChange={set('kota')} className={field} /></F>
          <F id="tanggal" label="Tanggal kirim"><input id="tanggal" required type="date" value={f.tanggal} onChange={set('tanggal')} className={field} /></F>
        </div>
        <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-5">
          <span className="text-muted">Subtotal</span>
          <span className="text-2xl font-semibold">{rupiah(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-muted">Ongkos kirim dan pembayaran dikonfirmasi oleh admin.</p>
        <button type="submit" className="btn btn-gold mt-6 w-full"><Icon name="whatsapp" size={16} /> Pesan via WhatsApp</button>
      </form>
    </div>
  );
}

function F({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm">{label}</label>
      {children}
    </div>
  );
}
