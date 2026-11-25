'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { minPrice, products } from '@/content/products';
import { categories, moments, priceRanges } from '@/content/site';
import { cn } from '@/lib/utils';

const sorts = [
  { id: 'kurasi', label: 'Kurasi kami' },
  { id: 'termurah', label: 'Harga terendah' },
  { id: 'termahal', label: 'Harga tertinggi' },
];

export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const momen = params.get('momen') ?? '';
  const kategori = params.get('kategori') ?? '';
  const harga = params.get('harga') ?? '';
  const sort = params.get('urut') ?? 'kurasi';

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    const s = next.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const list = useMemo(() => {
    const r = priceRanges.find((x) => x.id === harga);
    const res = products.filter(
      (p) => (!momen || p.moments.includes(momen as never)) && (!kategori || p.category === kategori) && (!r || (minPrice(p) >= r.min && minPrice(p) < r.max)),
    );
    if (sort === 'termurah') res.sort((a, z) => minPrice(a) - minPrice(z));
    if (sort === 'termahal') res.sort((a, z) => minPrice(z) - minPrice(a));
    return res;
  }, [momen, kategori, harga, sort]);

  const active = [momen, kategori, harga].filter(Boolean).length;

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mb-10 space-y-4">
        <ChipRow label="Momen" items={moments.map((m) => ({ id: m.id, label: m.name }))} value={momen} onPick={(v) => set('momen', v)} />
        <ChipRow label="Kategori" items={categories} value={kategori} onPick={(v) => set('kategori', v)} />
        <ChipRow label="Harga" items={priceRanges} value={harga} onPick={(v) => set('harga', v)} />
      </div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <p className="text-sm text-muted" aria-live="polite">
          {list.length} hadiah
          {active > 0 && (
            <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="ml-4 min-h-11 text-ink underline underline-offset-4">Hapus filter</button>
          )}
        </p>
        <label className="flex items-center gap-2 text-sm text-muted">
          Urutkan
          <select value={sort} onChange={(e) => set('urut', e.target.value === 'kurasi' ? '' : e.target.value)} className="h-11 rounded-full border border-line bg-white px-4 text-ink">
            {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
      </div>
      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="mb-5 text-muted">Belum ada hadiah dengan kombinasi ini. Coba ubah filter atau rancang hampers bespoke.</p>
          <a href="/bespoke" className="btn btn-gold">Rancang Hampers</a>
        </div>
      )}
    </section>
  );
}

function ChipRow({ label, items, value, onPick }: { label: string; items: { id: string; label: string }[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={`Filter ${label}`}>
      <span className="w-20 text-[11px] font-semibold tracking-[0.24em] text-faint uppercase">{label}</span>
      {items.map((it) => (
        <button key={it.id} type="button" aria-pressed={value === it.id} onClick={() => onPick(it.id)} className={cn('min-h-10 rounded-full border px-4 text-sm transition-colors', value === it.id ? 'border-gold bg-gold font-semibold' : 'border-line bg-white hover:border-ink')}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
