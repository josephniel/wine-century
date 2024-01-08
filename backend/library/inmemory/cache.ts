import { type CacheConfig } from '../../config/cache';
import { type Cache } from '../../interface/cache';

interface InMemoryObject {
  value: string;
  expiry: number;
}

export class InMemoryCache implements Cache {
  private map: Map<string, InMemoryObject>;
  private readonly config: CacheConfig;

  constructor(config: CacheConfig) {
    this.map = new Map();
    this.config = config;
  }

  get(key: string): string {
    const retVal = this.map.get(key);
    if (retVal === undefined) {
      throw new Error(`Cache key ${key} is not found.`);
    }
    if (retVal.expiry < Date.now()) {
      throw new Error(`Cache ${key} is expired.`);
    }
    return retVal.value;
  }

  set(key: string, value: string): void {
    const retVal = this.map.get(key);
    if (retVal !== undefined) {
      return;
    }

    const cacheObject: InMemoryObject = {
      value,
      expiry: Date.now() + this.config.expiryMs
    };
    this.map = this.map.set(key, cacheObject);
  }
}
