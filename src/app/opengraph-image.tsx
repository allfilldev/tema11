import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = site.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', color: '#1c1d21' }}>
        <div style={{ display: 'flex', fontSize: 104, letterSpacing: 40, paddingLeft: 40 }}>SEMARA</div>
        <div style={{ display: 'flex', marginTop: 16, fontSize: 24, letterSpacing: 12, color: '#946f1c' }}>GIFTING HOUSE</div>
        <div style={{ display: 'flex', marginTop: 40, width: 120, height: 4, background: '#d4af37' }} />
      </div>
    ),
    size,
  );
}
