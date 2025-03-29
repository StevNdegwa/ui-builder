/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UIBuildable, UISection } from "@modules/controls";
import { UIText } from "@modules/controls/Text";

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

  insertChildElement(name: BuildableElementNames) {
    const buildableInstance: UIBuildable = new ({
      "ui-text": UIText,
      "ui-section": UISection,
    }[name] || UISection)();

    const childElement = new DOMParser()
      .parseFromString(buildableInstance.serializeELement(), "text/html")
      .body.firstElementChild?.cloneNode(true) as Element;

    childElement.setAttribute("slot", "contents");

    this.element.appendChild(childElement);
  }

  getElementString() {
    return this.element.serializeELement();
  }
}
