import Head from 'next/head';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import CheckoutProduct from '../components/CheckoutProduct';

export default function Checkout() {
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const [groupedCartItems, setGroupedCartItems] = useState({});

  useEffect(() => {
    const groupedItems = cartItems.reduce((acc, item) => {
      (acc[item._id] = acc[item._id] || []).push(item);
      return acc;
    }, {});

    setGroupedCartItems(groupedItems);
  }, [cartItems]);

  return (
    <div>
      <Head>
        <title>Bag - Apple</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className=''>
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
          <div>
            {Object.entries(groupedCartItems).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
