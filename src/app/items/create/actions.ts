'use server';

import { database } from '@/db/database';
import { items } from '@/db/schema';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getSignedURLForS3Object } from '@/lib/s3';

interface CreateItemActionProps {
  fileName: string;
  name: string;
  startingPrice: number;
}

export async function createUploadUrlAction(
  key: string,
  fileType: string,
  fileSize: number
) {
  return await getSignedURLForS3Object({ key, fileType, fileSize });
}

export async function createItemAction({
  fileName,
  name,
  startingPrice,
}: CreateItemActionProps) {
  const session = await auth();

  if (!session?.user) throw new Error('Unauthorized');

  await database.insert(items).values({
    name,
    startingPrice,
    fileKey: fileName,
    userId: session.user.id!,
  });
  redirect('/');
}
