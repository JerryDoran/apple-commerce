import Image from 'next/image';
import Link from 'next/link';
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/outline';

export default function Header() {
  const session = false;
  return (
    <header className='sticky top-0 z-30 flex w-full items-center justify-between bg-[#e7ecee] p-4'>
      <div className='flex h-20 items-center justify-center md:w-1/5'>
        <Link href='/'>
          <div className='relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100'>
            <Image
              src='https://rb.gy/vsvv2o'
              layout='fill'
              objectFit='contain'
              alt='image'
            />
          </div>
        </Link>
      </div>
      <div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
        <a className='headerLink'>Product</a>
        <a className='headerLink'>Explore</a>
        <a className='headerLink'>Support</a>
        <a className='headerLink'>Business</a>
      </div>
      <div className='flex items-center justify-center gap-x-4 md:w-1/5'>
        <SearchIcon className='headerIcon' />
        <Link href='/checkout'>
          <div className='relative cursor-pointer'>
            <span className='absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-red-700 p-2 text-[12px] text-white'>
              4
            </span>
            <ShoppingBagIcon className='headerIcon' />
          </div>
        </Link>
        {session ? (
          <Image
            src={
              session.user?.image ||
              'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            }
            alt='profile-image'
            className='cursor-pointer rounded-full'
            w={34}
            h={34}
            onClick={() => signOut}
          />
        ) : (
          <UserIcon className='headerIcon' onClick={() => signOut} />
        )}
      </div>
    </header>
  );
}
