'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Diamond } from '@/components/Diamond';
import { Icon } from '@/components/Icon';
import { QtyInput } from '@/components/QtyInput';
import { finishing } from '@/content/site';
import type { Product } from '@/content/types';
import { cn, rupiah, WA_CONTACT_URL } from '@/lib/utils';

export function ProductDetail({ product, categoryLabel }: { product: Product; categoryLabel: string }) {
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [boxId, setBoxId] = useState(product.boxes[0].id);
  const [extras, setExtras] = useState<string[]>(['kartu']);
  const [note, setNote] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const box = product.boxes.find((b) => b.id === boxId)!;
  const extraTotal = finishing.filter((f) => extras.includes(f.id)).reduce((s, f) => s + f.price, 0);
  const unit = box.price + extraTotal;

  const toggle = (id: string) => setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const onAdd = () => {
    const detail = [box.label, ...finishing.filter((f) => extras.includes(f.id)).map((f) => f.label)].join(' · ');
    add({ slug: product.slug, name: product.name, detail, price: unit, image: product.images[0], qty, note });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="flex flex-wrap gap-x-16 gap-y-10">
      <div className="min-w-0 flex-[1_1_520px] self-start lg:sticky lg:top-32">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-pearl sm:aspect-[4/5]">
          <Image src={product.images[img]} alt={`${product.name}, foto ${img + 1}`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          {product.tag && <span className="absolute top-5 left-5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase">{product.tag}</span>}
          <div className="glass absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full p-1.5" role="tablist" aria-label="Foto produk">
            {product.images.map((src, i) => (
              <button key={src} type="button" role="tab" aria-selected={i === img} aria-label={`Foto ${i + 1}`} onClick={() => setImg(i)} className={cn('relative size-12 overflow-hidden rounded-full border-2', i === img ? 'border-gold' : 'border-transparent')}>
                <Image src={src} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-[1_1_400px]">
        <p className="kicker mb-3 flex items-center gap-2"><Diamond full />{categoryLabel}</p>
        <h1 className="display text-5xl sm:text-6xl">{product.name}</h1>
        <p className="mt-3 text-2xl font-medium">{rupiah(unit)}</p>
        <p className="mt-5 text-ink-2">{product.description}</p>

        {product.boxes.length > 1 && (
          <fieldset className="mt-8">
            <legend className="mb-3 text-[11px] font-semibold tracking-[0.24em] text-faint uppercase">Pilihan kotak</legend>
            <div className="flex flex-wrap gap-2">
              {product.boxes.map((b) => (
                <button key={b.id} type="button" aria-pressed={b.id === boxId} onClick={() => setBoxId(b.id)} className={cn('min-h-12 rounded-full border px-5 text-sm', b.id === boxId ? 'border-gold bg-gold font-semibold' : 'border-line hover:border-ink')}>
                  {b.label} · {rupiah(b.price)}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset className="mt-7">
          <legend className="mb-3 text-[11px] font-semibold tracking-[0.24em] text-faint uppercase">Sentuhan akhir</legend>
          <div className="space-y-2">
            {finishing.map((f) => (
              <label key={f.id} className={cn('flex min-h-13 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-sm', extras.includes(f.id) ? 'border-gold bg-gold/10' : 'border-line')}>
                <input type="checkbox" checked={extras.includes(f.id)} onChange={() => toggle(f.id)} className="size-[18px] accent-[#a88426]" />
                <span className="flex-1">{f.label}</span>
                <span className="text-muted">{f.price ? `+${rupiah(f.price)}` : 'Gratis'}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {extras.includes('kartu') && (
          <div className="mt-5">
            <label htmlFor="kartu" className="mb-2 block text-[11px] font-semibold tracking-[0.24em] text-faint uppercase">Pesan untuk kartu</label>
            <textarea id="kartu" rows={3} maxLength={240} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ditulis tangan oleh kaligrafer kami." className="w-full resize-y rounded-2xl border border-line px-4 py-3 text-[15px] placeholder:text-faint focus:border-ink focus:outline-none" />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <QtyInput value={qty} onChange={setQty} label={product.name} />
          <button type="button" onClick={onAdd} className="btn btn-gold h-[52px] min-h-[52px] flex-[1_1_220px]">
            {added ? <><Icon name="check" size={16} /> Masuk tas</> : `Tambahkan · ${rupiah(unit * qty)}`}
          </button>
        </div>
        <a href={WA_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="btn mt-3 w-full border border-ink hover:bg-ink hover:text-white">
          <Icon name="whatsapp" size={16} /> Konsultasi dengan Kurator
        </a>

        <div className="mt-8 border-t border-line">
          <Accordion title="Isi hadiah" open>
            <ul className="space-y-1.5">{product.contents.map((c) => <li key={c} className="flex gap-2.5"><Diamond className="mt-1.5 shrink-0 text-gold-2" size={12} />{c}</li>)}</ul>
          </Accordion>
          <Accordion title="Pengiriman">Disiapkan 1 sampai 2 hari kerja. Same day untuk Jakarta dan Semarang bila dikonfirmasi sebelum pukul 11.00 WIB. Seluruh Indonesia via kurir premium.</Accordion>
          <Accordion title="Perawatan kotak">Lap dengan kain kering. Hindari sinar matahari langsung agar warna kayu dan kain tetap awet.</Accordion>
        </div>
      </div>
    </div>
  );
}

function Accordion({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-[11px] font-semibold tracking-[0.24em] uppercase">
        {title}
        <Icon name="plus" size={16} className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-ink-2">{children}</div>
    </details>
  );
}
