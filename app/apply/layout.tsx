import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Application Prompt',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
