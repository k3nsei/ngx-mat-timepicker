import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { noopStorage } from './noop-storage';

export const PERSISTENT_PROPERTIES_STORAGE = new InjectionToken<Storage>(
  'PersistentPropertiesStorage',
);

export const PERSISTENT_PROPERTIES_PREFIX = new InjectionToken<string>(
  'PersistentPropertiesPrefix',
);

@Injectable({ providedIn: 'root' })
export class PersistentProperties {
  protected readonly storage: Storage;

  protected readonly prefix: string;

  constructor(
    @Optional()
    @Inject(PERSISTENT_PROPERTIES_STORAGE)
    storage: Storage | null,
    @Optional()
    @Inject(PERSISTENT_PROPERTIES_PREFIX)
    prefix: string | null,
  ) {
    this.storage = storage ?? noopStorage;
    this.prefix = prefix ?? '[PersistentProperties]';
  }

  public get<T = unknown>(key: string): T | null {
    try {
      const result = JSON.parse(
        this.storage.getItem(`${this.prefix} ${key}`) as string,
      );

      return result?.value as T;
    } catch {
      // ignore parsing error
    }

    return null;
  }

  public set<T = unknown>(key: string, value: T): void {
    return this.storage.setItem(
      `${this.prefix} ${key}`,
      JSON.stringify({ value }),
    );
  }

  public remove(key: string): void {
    return this.storage.removeItem(`${this.prefix} ${key}`);
  }

  public clear(): void {
    const keys: string[] = [];

    for (let i = 0; i < this.storage.length; i++) {
      const key: string | null = this.storage.key(i);

      if (key?.startsWith(this.prefix)) {
        keys.push(key);
      }
    }

    keys.forEach((key) => this.storage.removeItem(key));
  }
}
