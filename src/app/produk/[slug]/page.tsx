import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { getProduct, minPrice, products } from '@/content/products';
import { categories, site } from '@/content/site';
import { ProductDetail } from './ProductDetail';

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.summary}. ${p.description}`.slice(0, 160),
    alternates: { canonical: `/produk/${p.slug}` },
    openGraph: { images: [{ url: p.images[0], width: 900, height: 1200 }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = categories.find((c) => c.id === product.category)!;
  const related = products.filter((p) => p.slug !== product.slug && p.moments.some((m) => product.moments.includes(m))).slice(0, 4);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i}`),
    brand: { '@type': 'Brand', name: site.fullName },
    offers: { '@type': 'AggregateOffer', priceCurrency: 'IDR', lowPrice: minPrice(product), highPrice: Math.max(...product.boxes.map((b) => b.price)), availability: 'https://schema.org/InStock' },
  };

  return (
    <>
      <div className="container-page pt-32 pb-20 sm:pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted">
          <Link href="/" className="hover:text-ink">Beranda</Link> / <Link href="/koleksi" className="hover:text-ink">Koleksi</Link> /{' '}
          <Link href={`/koleksi?kategori=${category.id}`} className="hover:text-ink">{category.label}</Link> / <span className="text-ink">{product.name}</span>
        </nav>
        <ProductDetail product={product} categoryLabel={category.label} />
      </div>
      <section className="bg-pearl">
        <div className="container-page py-20">
          <div className="mb-10 text-center">
            <p className="kicker mb-2.5">Anda Mungkin Suka</p>
            <h2 className="display text-[40px] sm:text-5xl">Hadiah serupa</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
