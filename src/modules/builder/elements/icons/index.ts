const materialIconsUrl = new URL("./material.svg?no-inline", import.meta.url)
  .pathname;

export function icon({
  name = "square",
  attributes,
  title = name,
}: ElementConfigType & { title?: string }): ElementConfigType {
  const href = `${materialIconsUrl}#${name}-icon`;

  return {
    name: "use",
    classNames: [`${name}-icon`, "builder-icon"],
    attributes: {
      href,
      ...attributes,
    },
    children: [
      {
        name: "title",
        textContent: title,
      },
    ],
  };
}
