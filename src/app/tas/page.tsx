import type { Metadata } from 'next';
import { Checkout } from './Checkout';

export const metadata: Metadata = { title: 'Tas Belanja', robots: { index: false } };

export default function TasPage() {
  return (
    <section className="container-page pt-32 pb-20 sm:pt-40">
      <p className="kicker mb-2 text-center">Checkout</p>
      <h1 className="display mb-12 text-center text-5xl sm:text-6xl">Tas Belanja</h1>
      <Checkout />
    </section>
  );
}
