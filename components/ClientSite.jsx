'use client';
import dynamic from 'next/dynamic';

// The site reads the window size, device pixel ratio and saved theme on start, so it renders in the browser only.
const Site = dynamic(() => import('./Site'), { ssr: false, loading: () => <div style={{ position: 'fixed', inset: 0, background: '#000' }} /> });

export default function ClientSite() {
  return <Site />;
}
