import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { database } from '@/db/database';
import { bids as bidsSchema } from '@/db/schema';

export default async function Home() {
  const bids = await database.query.bids.findMany();

  const handleSubmitForm = async (formData: FormData) => {
    'use server';
    await database.insert(bidsSchema).values({});
  };

  return (
    <main className='container mx-auto py-12'>
      <form action={handleSubmitForm}>
        <Input name='bid' placeholder='Bid' />
        <Button type='submit'>Place bid</Button>
      </form>

      {bids.map((bid) => {
        return <div key={bid.id}>{bid.id}</div>;
      })}
    </main>
  );
}
