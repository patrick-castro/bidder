'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createItemAction, createUploadUrlAction } from './actions';
import { FormEvent } from 'react';

export default function CreateBids() {
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const file = formData.get('file') as File;

    const uploadUrlRes = await createUploadUrlAction(
      file.name,
      file.type,
      file.size
    );

    if (uploadUrlRes.success) {
      const { url } = uploadUrlRes.success;
      console.log({ uploadUrlRes, file });

      await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      const name = formData.get('name') as string;
      const startingPrice = parseInt(formData.get('startingPrice') as string);
      const startingPriceInCents = Math.floor(startingPrice * 100);

      await createItemAction({
        name,
        startingPrice: startingPriceInCents,
        fileName: file.name,
      });
    }
    // TODO: Handle failed scenarios
  };

  return (
    <main className='container mx-auto py-12 space-y-8'>
      <h1 className='text-4xl font-bold'>Post an item</h1>

      <form
        onSubmit={handleOnSubmit}
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
        <Input type='file' name='file' />

        <Button className='self-end' type='submit'>
          Post Item
        </Button>
      </form>
    </main>
  );
}
