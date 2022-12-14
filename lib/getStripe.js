import { loadStripe } from '@stripe/stripe-js';

// https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe#loading-stripe.js
// Singleton Pattern
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
