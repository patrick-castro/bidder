import { auth } from '@/auth';
import { env } from '@/env';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const TIME_EXPIRY = 60 * 30; // 30 mins
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 1048576 * 10; // 1MB

type GetSignedURLParams = {
  key: string;
  fileType: string;
  fileSize: number;
};

const s3Client = new S3Client({
  region: env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY!,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURLForS3Object({
  key,
  fileType,
  fileSize,
}: GetSignedURLParams) {
  const session = await auth();

  if (!session) {
    return { failure: 'not authenticated' };
  }

  if (!ALLOWED_FILE_TYPES.includes(fileType)) {
    return { failure: 'File type not allowed' };
  }

  if (fileSize > MAX_FILE_SIZE) {
    return { failure: 'File size too large' };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME!,
    // TODO: Replace the key value with a unique identifier. Currently I'm using the file.name
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
  });

  const url = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: TIME_EXPIRY,
  });

  return { success: { url } };
}
