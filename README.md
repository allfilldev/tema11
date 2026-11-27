# Semara Gifting House, Tema Toko Hadiah Luxury

Showcase tema e-commerce Bratamedia: toko hampers dan hadiah premium dengan gaya light glass (putih, abu mutiara, aksen gold). Statis penuh, checkout via WhatsApp, tanpa backend dan CMS.

## Stack
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, font Cormorant Garamond + Manrope self-host.

## Jalankan
```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # cek build production
```

## Halaman
- `/` Beranda: hero dengan kartu produk unggulan, pita keunggulan gold, koleksi pilihan, belanja per momen, bespoke, keahlian, corporate, logo klien, testimoni
- `/koleksi` Katalog dengan filter momen, kategori, harga (`?momen=`, `?kategori=`, `?harga=`) dan urutan
- `/produk/[slug]` Detail: galeri, pilihan kotak, sentuhan akhir (kartu, embos, pita), pesan kartu, jumlah
- `/bespoke` Perancang hampers: pilih kotak dan ukuran, isi (dibatasi sesuai ukuran), sentuhan akhir, ringkasan harga otomatis
- `/corporate` Layanan corporate, produk favorit, form konsultasi via WhatsApp, FAQ
- `/tas` Tas belanja dan form pengiriman, checkout terkirim sebagai pesan WhatsApp

## Ubah konten
- `src/content/site.ts`: kontak, momen, kategori, rentang harga, opsi bespoke (kotak, ukuran, isi), sentuhan akhir, testimoni, FAQ
- `src/content/products.ts`: daftar produk dan harga per pilihan kotak
- Logo All Fill Dev: satu warna, ganti warnanya lewat token `--color-logo` (dan `--color-logo-light` untuk latar gelap) di `src/app/globals.css`
- Warna dan font: `src/app/globals.css` (blok `@theme`). Efek kaca: utility `glass`

Tas belanja disimpan di localStorage browser.

## Gambar
Semua gambar di `public/images/` adalah ilustrasi dummy. Ganti dengan foto asli memakai nama file yang sama (webp; produk 900x1200, hero dan banner 1920x1100). Efek kaca akan terlihat lebih kuat di atas foto asli.
