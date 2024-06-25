import { env } from '@/env';

export function getImageUrl(key: string) {
  return `${env.NEXT_PUBLIC_BUCKET_URL}/${key}`;
}
