export function generate(elementConfigs: ElementConfigType[]): SVGElement[] {
  return elementConfigs.map((config) => getELement(config));
}

export function getELement(elementConfig: ElementConfigType): SVGElement {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    elementConfig.name
  ) as SVGElement;

  elementConfig.attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });

  element.textContent = elementConfig.textContent;

  return element;
}
