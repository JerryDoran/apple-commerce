import { ShoppingCartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { urlFor } from '../lib/sanity';
import { addToCart } from '../redux/cartSlice';

export default function Product({ product }) {
  const dispatch = useDispatch();
  const addToBasket = () => {
    dispatch(addToCart(product));

    toast.success(`${product.name} added to cart`, {
      position: 'bottom-center',
    });
  };

  return (
    <div className='flex h-fit w-[300px] select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[400px] md:w-[300px] md:p-10'>
      <div className='relative h-64 w-full md:h-72'>
        <Image
          src={urlFor(product.image[0]).url()}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='flex flex-1 items-center justify-between space-x-3'>
        <div className='space-y-2 text-gray-300 md:text-2xl'>
          <p className='text-xl'>{product.name}</p>
          <p>${product.price}.00</p>
        </div>
        <div className='shoppingCart' onClick={addToBasket}>
          <ShoppingCartIcon className='h-6 w-6 text-gray-300' />
        </div>
      </div>
    </div>
  );
}
