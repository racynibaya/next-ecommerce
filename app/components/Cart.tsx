'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';

const Cart = () => {
  const cartStore = useCartStore();

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
