import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import Footer from '../components/Footer';
import GlobalLanguageManager from '../components/GlobalLanguageManager';

export const metadata: Metadata = {
  title: 'Alex Wentzel - Portfolio',
  description: 'Portfolio website for Alex Wentzel',
  icons: {
    icon: 'https://i.ibb.co/37MY3YC/shape-18.png', 
  },
  generator: 'Next.js',
  applicationName: 'Alex Wentzel Portfolio',
  authors: [{ name: 'Alex Wentzel' }],
  creator: 'Alex Wentzel',
  publisher: 'Alex Wentzel',
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

