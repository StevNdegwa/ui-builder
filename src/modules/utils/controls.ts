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
  propsMap: Map<string, string | number | undefined>
): string {
  let properties = "";

  propsMap.forEach((value, key) => {
    const dimensionValue = getElementDimensionValue(value);
    properties += `${key}:${dimensionValue};`;
  });

  return properties;
}
