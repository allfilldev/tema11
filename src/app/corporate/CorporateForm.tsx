'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { waLink } from '@/lib/utils';

const field = 'h-12 w-full rounded-full border border-line bg-white px-5 text-[15px] placeholder:text-faint focus:border-ink focus:outline-none';

export function CorporateForm() {
  const [f, setF] = useState({ nama: '', perusahaan: '', jumlah: '', budget: '', tanggal: '', catatan: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      'Halo Semara, saya ingin konsultasi hadiah corporate.',
      '',
      `Nama: ${f.nama}`,
      `Perusahaan: ${f.perusahaan}`,
      `Jumlah paket: ${f.jumlah}`,
      `Budget per paket: ${f.budget}`,
      `Target tanggal kirim: ${f.tanggal}`,
      ...(f.catatan ? [`Catatan: ${f.catatan}`] : []),
    ].join('\n');
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={submit} className="glass grid min-w-0 flex-[1_1_440px] gap-4 rounded-[28px] border-gold/60 bg-pearl/70 p-6 sm:grid-cols-2 sm:p-8">
      <F id="c-nama" label="Nama"><input id="c-nama" required value={f.nama} onChange={set('nama')} className={field} autoComplete="name" /></F>
      <F id="c-pt" label="Perusahaan"><input id="c-pt" required value={f.perusahaan} onChange={set('perusahaan')} className={field} autoComplete="organization" /></F>
      <F id="c-jml" label="Jumlah paket"><input id="c-jml" required type="number" min={10} value={f.jumlah} onChange={set('jumlah')} placeholder="Minimal 10" className={field} /></F>
      <F id="c-budget" label="Budget per paket">
        <select id="c-budget" required value={f.budget} onChange={set('budget')} className={field}>
          <option value="">Pilih budget</option>
          <option>Rp750.000 sampai Rp1.500.000</option>
          <option>Rp1.500.000 sampai Rp3.000.000</option>
          <option>Di atas Rp3.000.000</option>
        </select>
      </F>
      <F id="c-tgl" label="Target tanggal kirim" full><input id="c-tgl" required type="date" value={f.tanggal} onChange={set('tanggal')} className={field} /></F>
      <F id="c-cat" label="Catatan (opsional)" full>
        <textarea id="c-cat" rows={3} value={f.catatan} onChange={set('catatan')} placeholder="Jumlah alamat, kebutuhan logo, preferensi isi" className="w-full rounded-2xl border border-line bg-white px-5 py-3 text-[15px] placeholder:text-faint focus:border-ink focus:outline-none" />
      </F>
      <button type="submit" className="btn btn-gold sm:col-span-2"><Icon name="whatsapp" size={16} /> Kirim via WhatsApp</button>
    </form>
  );
}

function F({ id, label, full, children }: { id: string; label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm">{label}</label>
      {children}
    </div>
  );
}
