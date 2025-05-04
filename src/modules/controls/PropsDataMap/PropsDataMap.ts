export class PropsDataMap extends Map<string, string> {
  constructor() {
    super();
  }

  get(key: string): string | undefined {
    const value = super.get(key);

    return value ? decodeURIComponent(value) : undefined;
  }

  set(key: string, value: string): this {
    const currValue = super.get(key);

    return currValue === value
      ? this
      : super.set(key, encodeURIComponent(value));
  }

  delete(key: string): boolean {
    return super.delete(key);
  }
}
