import './globals.css';
import Nav from './components/Nav';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Hydrate from './components/Hydrate';

import { Roboto, Lobster_Two } from 'next/font/google';

// Define main font

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  // so that tailwind can play with it
  variable: '--font-roboto',
});

const lobster = Lobster_Two({
  weight: '700',
  subsets: ['latin'],
  // so that tailwind can play with it
  variable: '--font-lobster',
});
export const metadata = {
  title: 'Racyn - Ecommerce',
  description: 'Ecommerce - Next JS',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // fetching user
  const session = await getServerSession(authOptions);

  return (
    <html className={` ${roboto.variable} ${lobster.variable}`} lang='en'>
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
