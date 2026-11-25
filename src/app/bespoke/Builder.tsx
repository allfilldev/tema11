'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Diamond } from '@/components/Diamond';
import { Icon } from '@/components/Icon';
import { bespokeBoxes, bespokeItems, bespokeSizes, finishing } from '@/content/site';
import { cn, rupiah } from '@/lib/utils';

const groups = [...new Set(bespokeItems.map((i) => i.group))];

export function Builder() {
  const { add } = useCart();
  const [boxId, setBoxId] = useState(bespokeBoxes[0].id);
  const [sizeId, setSizeId] = useState(bespokeSizes[1].id);
  const [picked, setPicked] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>(['kartu']);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [added, setAdded] = useState(false);

  const box = bespokeBoxes.find((b) => b.id === boxId)!;
  const size = bespokeSizes.find((s) => s.id === sizeId)!;
  const items = bespokeItems.filter((i) => picked.includes(i.id));
  const extraList = finishing.filter((f) => extras.includes(f.id));
  const total = box.price + size.add + items.reduce((s, i) => s + i.price, 0) + extraList.reduce((s, f) => s + f.price, 0);
  const full = picked.length >= size.max;

  const toggleItem = (id: string) => setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= size.max ? cur : [...cur, id]));
  const toggleExtra = (id: string) => setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const pickSize = (id: string) => {
    const s = bespokeSizes.find((x) => x.id === id)!;
    setSizeId(id);
    setPicked((cur) => cur.slice(0, s.max));
  };

  const onAdd = () => {
    const detail = [`${box.label} ${size.label}`, ...items.map((i) => i.label), ...extraList.map((f) => f.label), name && `Embos: ${name}`].filter(Boolean).join(' · ');
    add({ slug: 'bespoke', name: 'Hampers Bespoke', detail, price: total, image: box.image, qty: 1, note });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section className="container-page flex flex-wrap gap-x-14 gap-y-10 py-16 sm:py-24">
      <div className="min-w-0 flex-[999_1_560px] space-y-14">
        <Step no="I" title="Pilih kotak">
          <div className="grid gap-3 sm:grid-cols-3">
            {bespokeBoxes.map((b) => (
              <button key={b.id} type="button" aria-pressed={b.id === boxId} onClick={() => setBoxId(b.id)} className={cn('overflow-hidden rounded-3xl border-2 bg-white text-left transition-colors', b.id === boxId ? 'border-gold' : 'border-line hover:border-ink/40')}>
                <Image src={b.image} alt="" width={600} height={600} sizes="(min-width: 640px) 20vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                <span className="block p-4">
                  <span className="display block text-2xl">{b.label}</span>
                  <span className="block text-[13px] text-muted">{b.desc}</span>
                  <span className="mt-2 block text-sm font-semibold">{rupiah(b.price)}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {bespokeSizes.map((s) => (
              <button key={s.id} type="button" aria-pressed={s.id === sizeId} onClick={() => pickSize(s.id)} className={cn('min-h-12 rounded-full border px-5 text-sm', s.id === sizeId ? 'border-gold bg-gold font-semibold' : 'border-line bg-white hover:border-ink')}>
                {s.label} · {s.desc}{s.add ? ` · +${rupiah(s.add)}` : ''}
              </button>
            ))}
          </div>
        </Step>

        <Step no="II" title="Kurasi isi" aside={<span className={cn('text-sm', full ? 'font-semibold text-gold-text' : 'text-muted')}>{picked.length} dari {size.max} isi dipilih</span>}>
          <div className="space-y-6">
            {groups.map((g) => (
              <div key={g}>
                <p className="mb-2.5 text-[11px] font-semibold tracking-[0.24em] text-faint uppercase">{g}</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {bespokeItems.filter((i) => i.group === g).map((i) => {
                    const on = picked.includes(i.id);
                    const disabled = !on && full;
                    return (
                      <button key={i.id} type="button" aria-pressed={on} disabled={disabled} onClick={() => toggleItem(i.id)} className={cn('flex min-h-15 items-center gap-3 rounded-2xl border px-4 text-left text-sm transition-colors', on ? 'border-gold bg-gold/10' : 'border-line bg-white hover:border-ink/40', disabled && 'cursor-not-allowed opacity-45')}>
                        <span className={cn('inline-flex size-6 shrink-0 items-center justify-center rounded-full border', on ? 'border-gold bg-gold' : 'border-line')}>{on && <Icon name="check" size={13} stroke={2} />}</span>
                        <span className="flex-1">{i.label}</span>
                        <span className="text-muted">{rupiah(i.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Step>

        <Step no="III" title="Sentuhan akhir">
          <div className="space-y-2">
            {finishing.map((f) => (
              <label key={f.id} className={cn('flex min-h-13 cursor-pointer items-center gap-3 rounded-2xl border px-4 text-sm', extras.includes(f.id) ? 'border-gold bg-gold/10' : 'border-line bg-white')}>
                <input type="checkbox" checked={extras.includes(f.id)} onChange={() => toggleExtra(f.id)} className="size-[18px] accent-[#a88426]" />
                <span className="flex-1">{f.label}</span>
                <span className="text-muted">{f.price ? `+${rupiah(f.price)}` : 'Gratis'}</span>
              </label>
            ))}
          </div>
          {extras.includes('embos') && (
            <div className="mt-4">
              <label htmlFor="embos" className="mb-2 block text-sm">Nama untuk embos (maks. 20 huruf)</label>
              <input id="embos" maxLength={20} value={name} onChange={(e) => setName(e.target.value)} className="h-12 w-full rounded-full border border-line bg-white px-5 focus:border-ink focus:outline-none" />
            </div>
          )}
          {extras.includes('kartu') && (
            <div className="mt-4">
              <label htmlFor="pesan" className="mb-2 block text-sm">Pesan untuk kartu</label>
              <textarea id="pesan" rows={3} maxLength={240} value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-2xl border border-line bg-white px-4 py-3 focus:border-ink focus:outline-none" />
            </div>
          )}
        </Step>
      </div>

      <aside aria-label="Ringkasan hampers" className="min-w-0 flex-[1_1_320px] self-start lg:sticky lg:top-32">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image src="/images/bespoke.webp" alt="" fill sizes="400px" className="object-cover" />
          <div className="glass relative m-3 rounded-3xl p-6">
            <p className="kicker mb-2 flex items-center gap-2"><Diamond full />Ringkasan</p>
            <p className="display text-3xl">{box.label} {size.label}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              <Row label={`${box.label} ${size.label}`} value={box.price + size.add} />
              {items.map((i) => <Row key={i.id} label={i.label} value={i.price} />)}
              {extraList.map((f) => <Row key={f.id} label={f.label} value={f.price} />)}
            </ul>
            {!items.length && <p className="mt-3 text-[13px] text-muted">Belum ada isi. Anda juga bisa membiarkan kurator memilihkan.</p>}
            <div className="mt-5 flex items-baseline justify-between border-t border-ink/10 pt-4">
              <span className="text-muted">Total</span>
              <span className="text-2xl font-semibold">{rupiah(total)}</span>
            </div>
            <button type="button" onClick={onAdd} className="btn btn-gold mt-5 w-full">
              {added ? <><Icon name="check" size={16} /> Masuk tas</> : 'Tambahkan ke Tas'}
            </button>
            <p className="mt-3 text-center text-xs text-muted">Dirangkai dalam 3 sampai 5 hari kerja</p>
          </div>
        </div>
      </aside>
    </section>
  );
}

function Step({ no, title, aside, children }: { no: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-4">
          <span className="display inline-flex size-12 items-center justify-center rounded-full bg-gold text-2xl font-semibold">{no}</span>
          <span className="display text-4xl">{title}</span>
        </h2>
        {aside}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex justify-between gap-3">
      <span className="text-ink-2">{label}</span>
      <span className="shrink-0">{value ? rupiah(value) : 'Gratis'}</span>
    </li>
  );
}
