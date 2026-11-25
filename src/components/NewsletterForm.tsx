'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done) return <p className="max-w-md flex-[1_1_340px] text-ink-2">Terima kasih. Undangan koleksi berikutnya akan kami kirim ke email Anda.</p>;
  return (
    <form
      className="flex max-w-md flex-[1_1_340px] gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="nl" className="sr-only">Alamat email</label>
      <input id="nl" type="email" required placeholder="Alamat email Anda" className="h-13 min-w-0 flex-1 rounded-full border border-[#d9dbe0] bg-white px-5 text-sm focus:border-ink focus:outline-none" />
      <button type="submit" className="btn btn-gold h-13 min-h-13 px-6">Daftar</button>
    </form>
  );
}
