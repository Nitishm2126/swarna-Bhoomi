import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain.value),
  title: {
    default: `${siteConfig.name} | ${siteConfig.descriptor}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} offers premium residential plots in Krishnapuram, Thiruvallur, along the Chennai–Tirupati National Highway corridor.`,
  keywords: [
    'Swarna Bhoomi',
    'Thiruvallur residential plots',
    'Krishnapuram plots',
    'Chennai Tirupati highway plots',
    'Township plots Thiruvallur',
  ],
  authors: [{ name: siteConfig.developer.brandName }],
  creator: siteConfig.developer.brandName,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.domain.value,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.descriptor}`,
    description: `${siteConfig.name} offers premium residential plots in Krishnapuram, Thiruvallur.`,
  },
};

export const viewport: Viewport = {
  themeColor: '#04331e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-brand-cream text-brand-dark antialiased selection:bg-brand-gold selection:text-brand-dark">
        {children}
      </body>
    </html>
  );
}
