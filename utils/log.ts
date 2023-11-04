import type { createClient } from 'redis';

export async function log(redis: ReturnType<typeof createClient>, ipHash: string, ref?: string) {
  if (await redis.get(`ipHash:${ipHash}`)) {
    return;
  }

  const visitCountString = await redis.get('visitCount') ?? '0';
  const visitCount = parseInt(visitCountString, 10) + 1;
  await redis.set('visitCount', `${visitCount}`);
  await redis.set(`ipHash:${ipHash}`, 'true');

  if (!ref) {
    return;
  }

  const refStored = await redis.get(`ref:${ref}`) ?? '0';
  const refCount = parseInt(refStored, 10);
  await redis.set(`ref:${ref}`, refStored ? refCount + 1 : 0);
}
