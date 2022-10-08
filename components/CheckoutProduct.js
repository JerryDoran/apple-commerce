import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { removeFromCart } from '../redux/cartSlice';

export default function CheckoutProduct({ items, id }) {
  const dispatch = useDispatch();
  const removeFromBasket = () => {
    dispatch(removeFromCart({ id }));

    toast.error(`${items[0].name} removed from cart`, {
      position: 'bottom-center',
    });
  };

  return (
    <>
      <div className='relative h-40 w-40'>
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout='fill'
          objectFit='contain'
          alt='image'
        />
      </div>
      <div className='flex flex-1 items-end lg:items-center'>
        <div className='flex-1'>
          <div className='mb-2 flex flex-col gap-x-8 text-lg lg:flex-row lg:text-xl'>
            <h4 className='font-semibold lg:w-96'>{items[0].name}</h4>
            <p className='flex items-end gap-x-1 font-semibold'>
              {items.length}
              <ChevronDownIcon className='h-6 w-6 cursor-pointer text-blue-500' />
            </p>
          </div>
          <p className='mb-8 flex cursor-pointer items-end text-blue-500 hover:underline'>
            Show product details
            <ChevronDownIcon className='h-6 w-6 cursor-pointer text-blue-500' />
          </p>
        </div>
        <div>
          <h4>
            <Currency
              quantity={items.reduce((acc, item) => acc + item.price, 0)}
              currency='USD'
            />
          </h4>
          <button
            className='text-sm text-blue-500 hover:underline'
            onClick={removeFromBasket}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
