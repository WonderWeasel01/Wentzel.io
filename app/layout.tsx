import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import Footer from '../components/Footer';
import GlobalLanguageManager from '../components/GlobalLanguageManager';

export const metadata: Metadata = {
  metadataBase: new URL('https://wentzel.io'),
  title: {
    default: 'Alex Wentzel - Portfolio',
    template: '%s | Alex Wentzel',
  },
  description: 'Portfolio website for Alex Wentzel. Software developer specializing in React, Next.js, and creative web solutions.',
  icons: {
    icon: 'https://i.ibb.co/37MY3YC/shape-18.png',
  },
  generator: 'Next.js',
  applicationName: 'Alex Wentzel Portfolio',
  authors: [{ name: 'Alex Wentzel' }],
  creator: 'Alex Wentzel',
  publisher: 'Alex Wentzel',
  openGraph: {
    title: 'Alex Wentzel - Portfolio',
    description: 'Portfolio website for Alex Wentzel. Software developer specializing in React, Next.js, and creative web solutions.',
    url: 'https://wentzel.io',
    siteName: 'Alex Wentzel Portfolio',
    locale: 'da_DK',
    type: 'website',
    images: [
      {
        url: '/metabanner.png',
        width: 1200,
        height: 630,
        alt: 'Alex Wentzel Portfolio Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Wentzel - Portfolio',
    description: 'Portfolio website for Alex Wentzel. Software developer specializing in React, Next.js, and creative web solutions.',
    images: ['/metabanner.png'],
    creator: '@alexwentzel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body>
        <LanguageProvider>
          <GlobalLanguageManager />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

