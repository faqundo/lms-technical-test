// src/shared/cache.ts
import Redis from "ioredis";

const redisClient = new Redis({
  host: "redis", // Nombre del servicio Redis en docker-compose.yml
  port: 6379,
});

export class CacheService {
  private static instance: CacheService;

  private constructor(readonly client: Redis) {}

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService(redisClient);
    }
    return CacheService.instance;
  }

  public async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, "EX", ttl); // Almacena con tiempo de expiración
    } else {
      await this.client.set(key, value);
    }
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}