'use client';

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore, useThemeStore } from '@/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from './CheckoutForm';
import OrderAnimation from './OrderAnimation';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const router = useRouter();
  const cartStore = useCartStore();
  const themeStore = useThemeStore();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a paymentIntent as soon the page loads up
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then(res => {
        if (res.status === 403) {
          return router.push('/api/auth/signin');
        }
        return res.json();
        //   Set client secret and the payment intent associated with it
      })
      .then(data => {
        console.log(data);

        setClientSecret(data.paymentIntent.client_secret);
        cartStore.setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: themeStore.mode === 'winter' ? 'flat' : 'night',
      labels: 'floating',
    },
  };

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </motion.div>
      )}
    </div>
  );
}
