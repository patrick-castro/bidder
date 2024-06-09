import { auth } from '@/auth';
import { SignIn } from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';
import Image from 'next/image';
import Link from 'next/link';

export async function Header() {
  const session = await auth();
  return (
    <div className='bg-gray-200 py-4'>
      <div className='container flex justify-between items-center'>
        <Link href='/' className='hover:underline flex items-center gap-2'>
          <Image src='/logo.png' width='50' height='50' alt='Logo' />
          Bidder
        </Link>
        <div className='flex items-center gap-4'>
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
