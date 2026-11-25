import Image from 'next/image';
import Link from 'next/link';
import { minPrice } from '@/content/products';
import { categories } from '@/content/site';
import type { Product } from '@/content/types';
import { rupiah } from '@/lib/utils';
import { Icon } from './Icon';

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const multi = product.boxes.length > 1;
  const category = categories.find((c) => c.id === product.category)?.label;
  return (
    <Link href={`/produk/${product.slug}`} className="group flex flex-col">
      <span className="relative block aspect-[3/4] overflow-hidden rounded-[22px] bg-pearl">
        <Image src={product.images[0]} alt={product.name} fill priority={priority} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.tag && <span className="absolute top-3.5 left-3.5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-ink uppercase sm:text-[11px]">{product.tag}</span>}
        <span className="glass absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-2xl px-3.5 py-3 sm:inset-x-3.5 sm:bottom-3.5">
          <span className="text-[13px] font-semibold sm:text-sm">{multi ? `Mulai ${rupiah(minPrice(product))}` : rupiah(minPrice(product))}</span>
          <span className="hidden items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors group-hover:text-gold-text sm:inline-flex">
            <span className="group-hover:hidden">Detail</span>
            <span className="hidden group-hover:inline">Lihat</span>
            <Icon name="plus" size={14} />
          </span>
        </span>
      </span>
      <span className="mt-4 text-[11px] font-semibold tracking-[0.22em] text-faint uppercase">{category}</span>
      <span className="display mt-1 text-[22px] sm:text-[26px]">{product.name}</span>
    </Link>
  );
}
