import { auth } from '@/auth';
import { database } from '@/db/database';
import { ItemCard } from './item-card';

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) return null;

  const allItems = await database.query.items.findMany();

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
