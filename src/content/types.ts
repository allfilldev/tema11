export type MomentId = 'pernikahan' | 'ulang-tahun' | 'corporate' | 'hari-raya';
export type CategoryId = 'hampers' | 'kue-artisan' | 'self-care' | 'spiritual';

export type Option = { id: string; label: string; price: number };

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  moments: MomentId[];
  summary: string;
  description: string;
  contents: string[];
  /** Pilihan kotak. Harga final = harga pilihan kotak. */
  boxes: Option[];
  tag?: 'Edisi Terbatas' | 'Baru' | 'Favorit';
  images: string[];
  featured?: boolean;
};
