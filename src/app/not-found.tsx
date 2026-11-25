import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page pt-44 pb-28 text-center">
      <p className="kicker mb-3">404</p>
      <h1 className="display mb-4 text-5xl">Halaman tidak ditemukan</h1>
      <p className="mb-8 text-muted">Mungkin hadiah ini sudah tidak tersedia atau tautannya berubah.</p>
      <Link href="/koleksi" className="btn btn-gold">Jelajahi Koleksi</Link>
    </section>
  );
}
