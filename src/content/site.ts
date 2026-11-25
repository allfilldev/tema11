import type { CategoryId, MomentId } from './types';

export const site = {
  name: 'Semara',
  fullName: 'Semara Gifting House',
  tagline: 'Hampers & Hadiah Premium',
  description:
    'Semara Gifting House: hampers dan hadiah premium untuk pernikahan, ulang tahun, hari raya, dan corporate. Dirangkai tangan, kartu tulisan tangan, kirim ke seluruh Indonesia.',
  url: 'https://semara-gifting.vercel.app',
  city: 'Semarang',
  contact: {
    whatsapp: '62895326422692',
    whatsappDisplay: '+62 895-3264-22692',
    email: 'info@allfilldev.com',
    address: 'Pd. Bukit Agung No.1 Blok H, Sumurboto, Kec. Banyumanik, Semarang, Jawa Tengah',
    maps: 'https://maps.app.goo.gl/rhZBkKp7CNydwZQh7',
    hours: 'Senin sampai Sabtu, 07.00 sampai 22.00 WIB',
    instagram: 'https://www.instagram.com/allfilldev',
    instagramHandle: '@allfilldev',
  },
};

export const nav = [
  { label: 'Koleksi', href: '/koleksi' },
  { label: 'Momen', href: '/koleksi#momen' },
  { label: 'Bespoke', href: '/bespoke' },
];
export const navRight = [{ label: 'Corporate', href: '/corporate' }];

export const perks = ['Kartu tulisan tangan gratis', 'Same day Jakarta & Semarang', 'Kotak yang bisa disimpan', 'Konsultasi kurator via WhatsApp'];

export const moments: { id: MomentId; name: string; image: string; desc: string }[] = [
  { id: 'pernikahan', name: 'Pernikahan', image: '/images/momen-pernikahan.webp', desc: 'Hadiah untuk pasangan dan seserahan' },
  { id: 'ulang-tahun', name: 'Ulang Tahun', image: '/images/momen-ulang-tahun.webp', desc: 'Kejutan yang dipikirkan matang' },
  { id: 'corporate', name: 'Corporate', image: '/images/momen-corporate.webp', desc: 'Untuk klien dan mitra terpenting' },
  { id: 'hari-raya', name: 'Hari Raya', image: '/images/momen-hari-raya.webp', desc: 'Lebaran, Natal, dan Imlek' },
];

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'hampers', label: 'Hampers' },
  { id: 'kue-artisan', label: 'Kue Artisan' },
  { id: 'self-care', label: 'Self-care' },
  { id: 'spiritual', label: 'Spiritual' },
];

export const priceRanges = [
  { id: 'lt1', label: 'Di bawah Rp1,5 jt', min: 0, max: 1_500_000 },
  { id: '1-3', label: 'Rp1,5 jt sampai Rp3 jt', min: 1_500_000, max: 3_000_000 },
  { id: 'gt3', label: 'Di atas Rp3 jt', min: 3_000_000, max: Infinity },
];

export const finishing = [
  { id: 'kartu', label: 'Kartu tulisan tangan', price: 0 },
  { id: 'embos', label: 'Embos nama di kotak', price: 150_000 },
  { id: 'sutra', label: 'Pita sutra premium', price: 85_000 },
];

export const bespokeBoxes = [
  { id: 'kayu', label: 'Kotak Kayu', desc: 'Kayu pilihan berlapis kain, tutup magnet', price: 650_000, image: '/images/kotak-kayu.webp' },
  { id: 'kulit', label: 'Kotak Kulit', desc: 'Kulit sintetis premium, jahitan tangan', price: 890_000, image: '/images/kotak-kulit.webp' },
  { id: 'tenun', label: 'Kotak Tenun', desc: 'Dibalut kain tenun perajin lokal', price: 780_000, image: '/images/kotak-tenun.webp' },
];

export const bespokeSizes = [
  { id: 's', label: 'Petite', desc: 'Sampai 3 isi', max: 3, add: 0 },
  { id: 'm', label: 'Classic', desc: 'Sampai 5 isi', max: 5, add: 250_000 },
  { id: 'l', label: 'Grand', desc: 'Sampai 8 isi', max: 8, add: 550_000 },
];

export const bespokeItems = [
  { id: 'nastar', label: 'Nastar butter Wisman', group: 'Kue', price: 185_000 },
  { id: 'sable', label: 'Sablé cokelat Belgia', group: 'Kue', price: 210_000 },
  { id: 'macaron', label: 'Macaron 12 rasa', group: 'Kue', price: 320_000 },
  { id: 'teh', label: 'Teh premium 3 varian', group: 'Minuman', price: 240_000 },
  { id: 'kopi', label: 'Kopi single origin', group: 'Minuman', price: 195_000 },
  { id: 'madu', label: 'Madu hutan 250 ml', group: 'Minuman', price: 160_000 },
  { id: 'lilin', label: 'Lilin aroma oud', group: 'Self-care', price: 275_000 },
  { id: 'diffuser', label: 'Diffuser kayu', group: 'Self-care', price: 310_000 },
  { id: 'cangkir', label: 'Cangkir keramik handmade', group: 'Self-care', price: 225_000 },
  { id: 'tasbih', label: 'Tasbih kayu kokka', group: 'Spiritual', price: 290_000 },
  { id: 'sajadah', label: 'Sajadah sutra', group: 'Spiritual', price: 650_000 },
  { id: 'kurma', label: 'Kurma ajwa 500 g', group: 'Spiritual', price: 230_000 },
];

export const bespokeSteps = [
  { no: 'I', title: 'Pilih kotak', desc: 'Kayu, kulit, atau kain tenun, tiga ukuran.' },
  { no: 'II', title: 'Kurasi isi', desc: 'Pilih isi sendiri, atau biarkan kurator memilihkan.' },
  { no: 'III', title: 'Sentuhan akhir', desc: 'Embos nama, pita sutra, kartu tulisan tangan.' },
];

export const crafts = [
  { title: 'Kayu pilihan', desc: 'Kotak yang bisa disimpan' },
  { title: 'Pita sutra', desc: 'Diikat satu per satu' },
  { title: 'Tulisan tangan', desc: 'Kartu oleh kaligrafer' },
];

export const clients = ['AURUM BANK', 'Kinara', 'MERIDIAN', 'Halcyon', 'NUSA CAPITAL'];

export const testimonials = [
  { text: 'Klien kami menyimpan kotaknya sampai sekarang. Itu tanda hadiah yang benar-benar diingat.', name: 'Direktur Hubungan Klien, perusahaan perbankan' },
  { text: 'Kurator Semara memahami selera ibu saya lebih baik dari saya sendiri. Hadiah terbaik tahun ini.', name: 'Anindya, Jakarta' },
  { text: 'Pengiriman ke 240 alamat, rapi, tepat waktu, dan setiap penerima mendapat kartu tulisan tangan.', name: 'Head of People, perusahaan teknologi' },
];

export const corporateServices = [
  { title: 'Kotak berembos logo', desc: 'Logo perusahaan di kotak, pita, dan kartu.' },
  { title: 'Kurasi sesuai budget', desc: 'Proposal isi hampers dalam 1x24 jam kerja.' },
  { title: 'Kirim ke banyak alamat', desc: 'Upload daftar penerima, laporan per alamat.' },
  { title: 'Faktur resmi', desc: 'Termasuk faktur pajak dan termin pembayaran.' },
];

export const faqs = [
  { q: 'Berapa lama pesanan disiapkan?', a: 'Koleksi siap kirim disiapkan 1 sampai 2 hari kerja. Hampers bespoke membutuhkan 3 sampai 5 hari kerja.' },
  { q: 'Apakah bisa kirim di hari yang sama?', a: 'Bisa untuk area Jakarta dan Semarang bila pesanan dikonfirmasi sebelum pukul 11.00 WIB.' },
  { q: 'Apakah kartu ucapan benar-benar ditulis tangan?', a: 'Ya. Pesan Anda ditulis oleh kaligrafer kami di atas kertas katun, gratis untuk setiap pesanan.' },
  { q: 'Bagaimana cara pembayaran?', a: 'Setelah checkout via WhatsApp, admin mengirim rincian pesanan dan pembayaran lewat transfer bank, QRIS, atau kartu kredit.' },
];
