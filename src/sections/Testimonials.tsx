'use client';

import { useEffect, useState } from 'react';
import { testimonials } from '@/content/site';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [i]);
  const q = testimonials[i];
  return (
    <section className="container-page max-w-4xl py-20 text-center sm:py-28" aria-roledescription="carousel" aria-label="Testimoni">
      <blockquote aria-live="polite" className="display text-[28px] leading-snug italic sm:text-[40px]">“{q.text}”</blockquote>
      <p className="mt-7 text-xs font-semibold tracking-[0.24em] text-faint uppercase">{q.name}</p>
      <div className="mt-7 flex justify-center gap-1">
        {testimonials.map((t, idx) => (
          <button key={t.name} type="button" aria-label={`Testimoni ${idx + 1}`} aria-current={idx === i} onClick={() => setI(idx)} className="flex size-11 items-center justify-center">
            <span className={cn('size-2.5 rounded-full', idx === i ? 'bg-gold-deep' : 'bg-[#d3d5da]')} />
          </button>
        ))}
      </div>
    </section>
  );
}
