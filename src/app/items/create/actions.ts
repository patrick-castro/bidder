'use server';

import { database } from '@/db/database';
import { items } from '@/db/schema';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) throw new Error('Unauthorized');

  const startingPrice = formData.get('startingPrice') as string;
  const priceAsCents = Math.floor(parseFloat(startingPrice) * 100);

  console.log({ startingPrice, priceAsCents });

  await database.insert(items).values({
    name: formData.get('name') as string,
    startingPrice: priceAsCents,
    userId: session.user.id!,
  });
  redirect('/');
}
