import Image from 'next/image';
import Link from 'next/link';
import { Diamond } from './Diamond';

type Crumb = { label: string; href?: string };

export function PageHero({ kicker, title, text, image, crumbs }: { kicker: string; title: React.ReactNode; text?: string; image: string; crumbs: Crumb[] }) {
  return (
    <section className="relative overflow-hidden px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="relative mx-auto max-w-[86rem] overflow-hidden rounded-[32px]">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="relative flex min-h-[420px] items-end px-4 pt-32 pb-8 sm:px-10 sm:pb-10">
          <div className="glass max-w-xl rounded-[28px] p-6 sm:p-9">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-xs text-muted">
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex gap-1.5">
                  {c.href ? <Link href={c.href} className="hover:text-ink">{c.label}</Link> : <span className="text-ink">{c.label}</span>}
                  {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                </span>
              ))}
            </nav>
            <p className="kicker mb-3 flex items-center gap-2"><Diamond full />{kicker}</p>
            <h1 className="display text-[44px] sm:text-6xl">{title}</h1>
            {text && <p className="mt-4 text-ink-2">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
