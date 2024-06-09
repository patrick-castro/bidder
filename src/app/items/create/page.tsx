import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createItemAction } from './actions';

export default async function CreateBids() {
  return (
    <main className='container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Post an item</h1>

      <form
        action={createItemAction}
        className='flex flex-col border p-8 rounded-xl space-y-4 max-w-lg'
      >
        <Input
          className='max-w-lg'
          name='name'
          placeholder='Name your item'
          required
        />
        <Input
          className='max-w-lg'
          name='startingPrice'
          type='number'
          step='0.01'
          placeholder='What to start your auction at'
          required
        />
        <Button className='self-end' type='submit'>
          Post Item
        </Button>
      </form>
    </main>
  );
}
