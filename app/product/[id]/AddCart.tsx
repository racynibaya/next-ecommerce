'use client';

import { useCartStore } from '@/store';
import { AddCartType } from '@/types/add-cart-type';

const AddCart = ({ name, id, image, unit_amount, quantity }: AddCartType) => {
  const cartStore = useCartStore();
  return (
    <>
      <button
        className='my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700 '
        onClick={() =>
          cartStore.addProduct({ id, name, image, unit_amount, quantity })
        }
      >
        Add to cart
      </button>
    </>
  );
};

export default AddCart;
