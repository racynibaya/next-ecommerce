'use client';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Cart';
import { AiFillShopping } from 'react-icons/ai';
import { useCartStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import DarkLight from './DarkLight';

const toggleTheme = function (theme: string) {
  if (theme === 'light')
    document.documentElement.setAttribute('data-theme', 'dark');
  else if (theme === 'dark')
    document.documentElement.setAttribute('data-theme', 'light');
};

const Nav = ({ user }: Session) => {
  const cartStore = useCartStore();
  return (
    <nav className='flex justify-between items-center py-12 bg-red'>
      <Link href={'/'}>
        <h1 className='font-lobster text-xl'>Racyn Ibaya</h1>
      </Link>
      <ul className='flex items-center gap-8'>
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className='flex items-center text-3xl relative cursor-pointer'
        >
          {<AiFillShopping />}
          {cartStore.cart.length > 0 && (
            <AnimatePresence>
              <motion.span
                animate={{
                  scale: 1,
                }}
                initial={{
                  scale: 0,
                }}
                exit={{
                  scale: 0,
                }}
                className='bg-primary text-white text-sm fontbold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'
              >
                {cartStore.cart.length}
              </motion.span>
            </AnimatePresence>
          )}
        </li>
        {/* Dark mode */}
        <DarkLight />
        {!user && (
          <li className='bg-primary text-white py-2 px-4 rounded-md'>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {user && (
          <li>
            <div className='dropdown dropdown-end cursor-pointer'>
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                tabIndex={0}
                className='rounded-full'
              />

              <ul
                tabIndex={0}
                className='dropdown-content menu p-4 shadow bg-base-100 rounded-box w-52'
              >
                <Link
                  className='hover:bg-base-300 p-4 rounded-md'
                  href='/dashboard'
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  className='hover:bg-base-300 p-4 rounded-md'
                  onClick={() => {
                    signOut();
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}

        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </ul>
    </nav>
  );
};

export default Nav;
