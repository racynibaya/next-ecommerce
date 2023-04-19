'use client';

import { useCartStore } from '@/store';
import { AddCartType } from '@/types/add-cart-type';
import { useState } from 'react';

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, image, unit_amount, quantity });
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };
  const cartStore = useCartStore();
  return (
    <>
      <button
        className='my-4 btn btn-primary w-full'
        onClick={handleAddToCart}
        disabled={added}
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart 😏</span>}
      </button>
    </>
  );
};

export default AddCart;
