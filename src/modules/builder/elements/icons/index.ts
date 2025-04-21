import settings from "./settings.svg";
import square from "./square.svg";
import bin from "./bin.svg";
import editSquare from "./edit-square.svg";

const mapping = {
  settings,
  square,
  bin,
  "edit-square": editSquare,
};

type MappingType = keyof typeof mapping;

export function icon({
  name,
  attributes,
}: ElementConfigType): ElementConfigType {
  const href = mapping[name as MappingType] || mapping.square;

  return {
    name: "image",
    classNames: [`${name}-icon`],
    attributes: {
      href,
      "pointer-events": "none",
      ...attributes,
    },
  };
}
