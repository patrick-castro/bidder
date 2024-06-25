import { auth } from '@/auth';
import { database } from '@/db/database';
import { ItemCard } from '../item-card';
import { eq } from 'drizzle-orm';
import { items } from '@/db/schema';

export default async function MyAuctionPage() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('unauthorized');
  }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  return (
    <main className='container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Items for Sale</h1>

      <div className='grid grid-cols-4 gap-4'>
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
