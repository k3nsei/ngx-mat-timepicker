export const noopStorage: Storage = new Proxy(
  Object.freeze<Storage>({
    length: 0,
    getItem(_key: string): string | null {
      return null;
    },
    setItem(_key: string, _value: string): void {},
    removeItem(_key: string): void {},
    clear(): void {},
    key(_index: number): string | null {
      return null;
    },
  }),
  {
    get(target: Storage, prop: string | symbol, receiver: any): any {
      return Reflect.get(target, prop, receiver) ?? null;
    },
  },
);
