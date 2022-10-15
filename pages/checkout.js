import Head from 'next/head';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import CheckoutProduct from '../components/CheckoutProduct';
import { fetchPostJSON } from '../lib/api-helpers';
import getStripe from '../lib/getStripe';

export default function Checkout() {
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const [groupedCartItems, setGroupedCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = cartItems.reduce((acc, item) => {
      (acc[item._id] = acc[item._id] || []).push(item);
      return acc;
    }, {});

    setGroupedCartItems(groupedItems);
  }, [cartItems]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession = await fetchPostJSON('/api/checkout-sessions', {
      cartItems: cartItems,
    });

    // Internal server error
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.error);
      return;
    }

    // Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);

    setLoading(false);
  };

  return (
    <div className='min-h-screen overflow-hidden bg-[#e7ecee]'>
      <Head>
        <title>Bag - Apple</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mx-auto max-w-5xl pb-24'>
        <div className='px-8'>
          <h1 className='my-5 text-2xl font-semibold lg:text-3xl'>
            {cartItems.length > 0 ? 'Review your cart.' : 'Your cart is empty'}
          </h1>
          <p className='my-4'>Free delivery and returns</p>
          {cartItems.length === 0 && (
            <Button
              title='Continue Shopping'
              onClick={() => router.push('/')}
            />
          )}
        </div>
        {cartItems.length > 0 && (
          <div className='mx-5 md:mx-8'>
            {Object.entries(groupedCartItems).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
            <div className='my-12 mt-6 ml-auto max-w-3xl'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>
                      <Currency
                        quantity={cartItems.reduce(
                          (acc, item) => acc + item.price,
                          0
                        )}
                        currency='USD'
                      />
                      {/* <Currency quantity={cartTotal} currency='USD' /> */}
                    </p>
                  </div>
                  <div className='mt-1 flex justify-between'>
                    <p className='text-sm'>Shipping</p>
                    <p className='text-sm'>FREE</p>
                  </div>
                  <div className='mt-1 flex justify-between'>
                    <div className='flex flex-col gap-x-1 text-sm lg:flex-row'>
                      <p>Estimated tax for: </p>
                      <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                        <p>Zip Code</p>
                        <ChevronDownIcon className='h-6 w-6' />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className='flex justify-between pt-4 text-xl font-semibold'>
                  <h4>Total</h4>
                  <h4>
                    <Currency
                      quantity={cartItems.reduce(
                        (acc, item) => acc + item.price,
                        0
                      )}
                      currency='USD'
                    />
                  </h4>
                </div>
              </div>
              <div className='my-14 space-y-4'>
                <h4 className='text-lg font-semibold'>
                  How would you like to check out?
                </h4>
                <div className='flex flex-col gap-4 md:flex-row'>
                  <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                    <h4 className='mb-4 flex flex-col text-lg font-semibold'>
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/month at 0% APR<sup className='-top-1'>◊</sup>
                      </span>
                    </h4>
                    <Button title='Check Out with Apple Card' />
                    <p className='mt-2 max-w-[240px] text-[13px]'>
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
                    <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                      Pay in full
                      <span>
                        <Currency
                          quantity={cartItems.reduce(
                            (acc, item) => acc + item.price,
                            0
                          )}
                          currency='USD'
                        />
                      </span>
                    </h4>

                    <Button
                      noIcon
                      loading={loading}
                      title='Check Out'
                      width='w-full'
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
