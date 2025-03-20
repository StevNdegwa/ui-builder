import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/function";

export const isCustomWebComponentDefined = (tagName: string) => {
  return customElements.get(tagName) !== undefined;
};

export const parseDimensionValue = (
  value: string | number | undefined
): O.Option<string> => {
  if (typeof value === "string") {
    return O.some(value);
  } else if (typeof value === "number") {
    return O.some(`${value}px`);
  }

  return O.none;
};

export function getElementDimensionValue(
  value: string | number | undefined
): string {
  return pipe(
    value,
    parseDimensionValue,
    O.getOrElse(() => "")
  );
}

export function getPropertiesAsString(
  props: Record<string, string | number>
): string {
  let properties = "";

  for (const key in props) {
    const element = props[key];
    properties += `${key}:${element};`;
  }

  return properties;
}
