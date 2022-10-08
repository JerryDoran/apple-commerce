import { ShoppingBagIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return null;
  }
  return (
    <Link href='/checkout'>
      <div className='fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300'>
        {cartItems.length > 0 && (
          <span className='cartInfo'>{cartItems.length}</span>
        )}
        <ShoppingBagIcon className='headerIcon h-8 w-8' />
      </div>
    </Link>
  );
}
