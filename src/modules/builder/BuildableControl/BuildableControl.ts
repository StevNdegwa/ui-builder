/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UIBuildable } from "@modules/controls";

export class BuildableControl {
  element: UIBuildable;

  constructor(element: UIBuildable) {
    this.element = element;
  }

  getElement(): UIBuildable {
    return this.element;
  }

  getElementProperties() {}

  updateProperties(prop: string, value: string) {
    // @ts-expect-error
    this.element[prop] = value;
  }

  insertChildElement() {
    const newElement = document.createElement("div");

    newElement.setAttribute("slot", "contents");

    newElement.textContent = "Sample added section to test";

    this.element.appendChild(newElement);
  }

  getElementString() {
    return this.element.serializeELement();
  }
}
