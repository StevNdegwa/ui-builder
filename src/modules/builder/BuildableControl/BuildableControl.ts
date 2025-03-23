/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UISection } from "@modules/controls";

export class BuildableControl {
  element: UISection;

  constructor() {
    this.element = this.createElement();
  }

  createElement = (): UISection => {
    const element = document.createElement("ui-section") as UISection;
    element.setAttribute("props", JSON.stringify({ background: "#f0f0f0" }));
    return element;
  };

  getElement(): UISection {
    return this.element;
  }

  getElementProperties() {}

  updateProperties(prop: string, value: string) {
    // @ts-expect-error
    this.element[prop] = value;
  }

  getElementString() {
    return this.element.serializeELement();
  }
}
