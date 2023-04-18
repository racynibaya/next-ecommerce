import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AddCartType } from './types/add-cart-type';


type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  clearCart: () => void;
  paymentIntent: string;
  setPaymentIntent: (val: string) => void;
  onCheckout: string;
  setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      cart: [],
      paymentIntent: '',
      onCheckout: 'cart',
      isOpen: false,
      toggleCart: () =>
        set(state => ({
          isOpen: !state.isOpen,
        })),

      addProduct: item => {
        set(state => {
          const existingItem = state.cart.find(
            cartItem => cartItem.id === item.id
          );
          console.log(existingItem?.id);

          if (existingItem) {
            const updatedCart = state.cart.map(cartItem => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity && cartItem.quantity + 1,
                };
              }

              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        });
      },

      removeProduct: item => {
        set(state => {
          // Check if the item exists and decrease quantity by 1
          const existingItem = state.cart.find(
            cartItem => item.id === cartItem.id
          );

          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map(cartItem => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity && cartItem.quantity - 1,
                };
              }
              return cartItem;
            });

            return { cart: updatedCart };
          } else {
            // Remove item from cart
            const filteredCart = state.cart.filter(
              cartItem => cartItem.id !== item.id
            );

            return { cart: filteredCart };
          }
        });
      },

      setPaymentIntent: val => set(state => ({ paymentIntent: val })),

      setCheckout: val =>
        set(state => ({
          onCheckout: val,
        })),

      clearCart: () => set(state => ({ cart: [] })),
      // end
    }),

    { name: 'cart-store' }
  )
);
