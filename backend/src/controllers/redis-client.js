import { createClient } from 'redis';
import { promisify } from 'util';
import hash from 'hash';
import zlib from 'zlib';

/* Promisify compression/decompression */





function isCacheActive(cache) {
  return !!cache?.isOpen;
}

/* Express compatible middleware for Redis caching */
export default function redisCacheMiddleware() {

  return ( 
    async (req, res, next) => {
      if (!activeValidRedis) {
        return 0;
      }

      const token = grabRequestToken(req);
      const existing = await redisAsyncGet(token);
      if (existing) {
        try {

        } catch {

        }
      }
      
      else {
        await redisAsyncSet()
      }
      redisCache.get()
    }
  );


}