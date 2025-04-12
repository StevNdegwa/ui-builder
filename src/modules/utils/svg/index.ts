export function generate(elementConfigs: ElementConfigType[]): SVGElement[] {
  return elementConfigs.map((config) => getELement(config));
}

export function getELement(
  elementConfig: ElementConfigType,
  parent?: SVGElement
): SVGElement {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    elementConfig.name
  ) as SVGElement;

  if (elementConfig.attributes) {
    for (const prop in elementConfig.attributes) {
      if (elementConfig.attributes[prop]) {
        element.setAttribute(prop, elementConfig.attributes[prop] + "");
      }
    }
  }

  elementConfig.classNames?.forEach((className) => {
    element.classList.add(className);
  });

  elementConfig.events?.forEach(({ name, handler }) =>
    element.addEventListener(name, handler)
  );

  if (elementConfig.textContent)
    element.textContent = elementConfig.textContent;

  if (elementConfig.data)
    Object.entries(elementConfig.data).forEach(([key, value]) => {
      element.dataset[key] = value + "";
    });

  elementConfig.children?.forEach((childConfig) =>
    getELement(childConfig, element)
  );

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}

export const setElementAttributes = (
  element: SVGElement,
  attributes: Record<string, string | number>
) => {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value.toString());
  }
};
