import { type Provider } from '@angular/core';

import {
  PERSISTENT_PROPERTIES_PREFIX,
  PERSISTENT_PROPERTIES_STORAGE,
  PersistentProperties,
} from './persistent-properties';

export * from './persistent-properties';

export function providePersistentProperties(config?: {
  storage?: Storage;
  prefix?: string;
}): Provider[] {
  const providers: Provider[] = [
    {
      provide: PersistentProperties,
      useClass: PersistentProperties,
    },
  ];

  if (config?.storage) {
    providers.unshift({
      provide: PERSISTENT_PROPERTIES_STORAGE,
      useValue: config.storage,
    });
  }

  if (config?.prefix) {
    providers.unshift({
      provide: PERSISTENT_PROPERTIES_PREFIX,
      useValue: config.prefix,
    });
  }

  return providers;
}
