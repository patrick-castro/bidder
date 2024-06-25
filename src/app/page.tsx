import { auth } from '@/auth';
import { database } from '@/db/database';
import { getImageUrl } from '@/util/files';
import Image from 'next/image';

export default async function Home() {
  const session = await auth();

  const allItems = await database.query.items.findMany();

  if (!session || !session.user) return null;

  return (
    <main className='container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Items for Sale</h1>

      <div className='grid grid-cols-4 gap-4'>
        {allItems.map((item) => {
          return (
            <div key={item.id} className='border p-8 rounded-xl'>
              <Image
                src={getImageUrl(item.fileKey)}
                alt={item.name}
                width={200}
                height={200}
              />
              {item.name}
              starting price: ${item.startingPrice / 100}
            </div>
          );
        })}
      </div>
    </main>
  );
}
