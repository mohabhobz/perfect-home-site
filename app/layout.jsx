import './globals.css';

export const metadata = {
  title: 'المساكن المتقنة | Perfect Home',
  description: 'بيرفكت هوم شركة سعودية مقرّها الرياض للتصميم والتنفيذ والمقاولات العامة.',
  icons: { icon: '/media/logo/ph-mark.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/media/fonts/NotoKufiArabic-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/fonts/IBMPlexSansArabic-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/logo/ph-mark.svg" as="image" />
      </head>
      <body style={{ margin: 0, background: '#000' }}>{children}</body>
    </html>
  );
}
