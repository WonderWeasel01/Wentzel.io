import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import HomePage from '../components/HomePage';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alex Wentzel — Full Stack Developer',
  description: 'Portfolio for Alex Wentzel. Full Stack Developer from Næstved building digital products that work and look great.',
  openGraph: {
    title: 'Alex Wentzel — Full Stack Developer',
    description: 'Portfolio for Alex Wentzel. Full Stack Developer from Næstved building digital products that work and look great.',
  },
};

export default function Page() {
  return (
    <div className={interTight.className}>
      <HomePage />
    </div>
  );
}
