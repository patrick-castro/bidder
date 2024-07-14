import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
    AWS_BUCKET_NAME: z.string().min(1),
    AWS_BUCKET_REGION: z.string().min(1),
    AWS_ACCESS_KEY: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    KNOCK_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_BUCKET_URL: z.string().url(),
    NEXT_PUBLIC_KNOCK_API_KEY: z.string().min(1),
    NEXT_PUBLIC_KNOCK_FEED_ID: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    NEXT_PUBLIC_BUCKET_URL: process.env.NEXT_PUBLIC_BUCKET_URL,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_KNOCK_API_KEY: process.env.NEXT_PUBLIC_KNOCK_API_KEY,
    NEXT_PUBLIC_KNOCK_FEED_ID: process.env.NEXT_PUBLIC_KNOCK_FEED_ID,
    KNOCK_SECRET_KEY: process.env.KNOCK_SECRET_KEY,
  },
});
