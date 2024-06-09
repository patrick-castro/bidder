import { auth } from '@/auth';
import { SignIn } from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { database } from '@/db/database';
import { bids as bidsSchema, items as itemsSchema } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const session = await auth();

  const allItems = await database.query.items.findMany();

  if (!session || !session.user) return null;

  const handleSubmitForm = async (formData: FormData) => {
    'use server';
    await database.insert(itemsSchema).values({
      name: formData.get('name') as string,
      userId: session?.user?.id!,
    });
    revalidatePath('/');
  };

  return (
    <main className='container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Items for Sale</h1>

      <div className='grid grid-cols-4 gap-4'>
        {allItems.map((item) => {
          return (
            <div key={item.id} className='border p-8 rounded-xl'>
              {item.name}
              starting price: ${item.startingPrice / 100}
            </div>
          );
        })}
      </div>
    </main>
  );
}
