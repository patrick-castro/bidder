'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from '@knocklabs/react';
import { signOut, signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { formatCentsToDollar } from '@/util/currency';

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  const userId = session?.data?.user?.id;

  return (
    <div className='bg-gray-200 py-4'>
      <div className='container flex justify-between items-center'>
        <div className='flex items-center gap-12'>
          <Link href='/' className='hover:underline flex items-center gap-2'>
            <Image src='/logo.png' width='50' height='50' alt='Logo' />
            Bidder
          </Link>

          <div className='flex items-center gap-8'>
            <Link href='/' className='hover:underline flex items-center gap-2'>
              All Auctions
            </Link>

            {userId && (
              <>
                <Link
                  href='/items/create'
                  className='hover:underline flex items-center gap-2'
                >
                  Create Auction
                </Link>
                <Link
                  href='/auctions'
                  className='hover:underline flex items-center gap-2'
                >
                  My Auctions
                </Link>
              </>
            )}
          </div>
        </div>

        <div className='flex items-center gap-4'>
          {userId && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => {
                  if (!item?.data?.itemId) return null;

                  return (
                    <NotificationCell {...props} item={item}>
                      <div className='bg-gray-100 rounded-xl'>
                        <Link
                          className='text-blue-400 hover:text-blue-500'
                          onClick={() => {
                            setIsVisible(false);
                          }}
                          href={`/items/${item.data.itemId}`}
                        >
                          Someone outbidded you on{' '}
                          <span className='font-bold'>
                            {item.data.itemName}
                          </span>{' '}
                          by ${formatCentsToDollar(item.data.bidAmount)}
                        </Link>
                      </div>
                    </NotificationCell>
                  );
                }}
              />
            </>
          )}

          {session?.data?.user?.image && (
            <Image
              src={session.data.user.image}
              width='40'
              height='40'
              alt='user avatar'
              className='rounded-full'
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            {userId ? (
              <Button
                type='submit'
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type='submit' onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
