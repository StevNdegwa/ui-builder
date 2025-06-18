export class PropsDataMap extends Map<string, string> {
  constructor(initialValue?: string) {
    super();

    if (initialValue) {
      const propData = initialValue.split(";");

      propData.forEach((prop) => {
        const [key, value] = prop.split(":");

        this.set(key, decodeURIComponent(value));
      });
    }
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

  init(key: string, value: string): this {
    if (this.has(key)) {
      return this;
    }

    return this.set(key, value);
  }
}
