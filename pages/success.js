import { CheckIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '../components/Button';

export default function Success() {
  const router = useRouter();

  const { session_id } = router.query;
  return (
    <div>
      <Head>
        <title>Thank you! - Apple</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <header>
        <Link href='/'>
          <div className='relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden'>
            <Image
              src='https://rb.gy/vsvv2o'
              layout='fill'
              objectFit='contain'
              alt='logo'
            />
          </div>
        </Link>
      </header> */}
      <main className=''>
        <section className='order-2 mx-auto max-w-xl pb-12 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44'>
          {/* <Link href='/'>
            <div className='relative ml-4 hidden h-16 w-8 cursor-pointer transition lg:inline-flex'>
              <Image
                src='https://rb.gy/vsvv2o'
                layout='fill'
                objectFit='contain'
                alt='logo'
              />
            </div>
          </Link> */}
          <div className='my-8 ml-4 flex gap-x-4 lg:ml-14 xl:ml-0'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-black'>
              <CheckIcon className='h-8 w-8' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className='text-lg'>
                Thank you{' '}
                {/* {session ? session.user?.name?.split(' ')[0] : 'Guest'} */}
              </h4>
            </div>
          </div>
          <div className='mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <div className='space-y-2 pb-3'>
              <p>Your order is confirmed</p>
              <p className='text-sm text-gray-600'>
                We’ve accepted your order, and we’re getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className='pt-3 text-sm'>
              <p className='font-medium text-gray-600'>
                Order tracking number:
              </p>
              <p>CNB21441622</p>
            </div>
          </div>
          <div className='my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <p>Order updates</p>
            <p className='text-sm text-gray-600'>
              You’ll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div className='mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row'>
            <p className='hidden lg:inline'>Need help? Contact us</p>
            {/* {mounted && (
              <Button
                title='Continue Shopping'
                onClick={() => router.push('/')}
                width={isTabletOrMobile ? 'w-full' : undefined}
                padding='py-4'
              />
            )} */}
          </div>
        </section>
      </main>
    </div>
  );
}
