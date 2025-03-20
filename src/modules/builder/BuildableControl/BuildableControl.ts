import { Buildable } from "@modules/controls";

export class BuildableControl {
  element: Buildable;

  constructor(element: Buildable) {
    this.element = element;
  }

  getElement(): Buildable {
    return this.element;
  }

  getElementProperties() {}

  updateProperties() {}

  getElementString() {}
}
