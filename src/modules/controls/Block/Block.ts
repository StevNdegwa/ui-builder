import { css, CSSResultGroup } from "lit";
import {
  getElementDimensionValue,
  getPropertiesAsString,
} from "@modules/utils/controls";
import { ELEMENT_STYLE_PROPERTIES } from "../constants";
import { Buildable } from "../Buildable";

export class UIBlock extends Buildable implements IBuildableBlockElement {
  declare width: string | number;
  declare height: string | number;

  constructor() {
    super();
    this.width = "100%";
    this.height = "100%";
  }

  static properties = {
    ...Buildable.properties,
    width: { type: String },
    height: { type: String },
  };

  static styles?: CSSResultGroup = css`
    :host {
      --ui-buildable-element-width: 100%;
      --ui-buildable-element-height: 100%;
      padding: 0px;
      margin: 0px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: block;
    }

    :host > .wrapper {
      width: var(--ui-buildable-element-width, 100%);
      height: var(--ui-buildable-element-height, 0px);
      background-color: yellow;
      padding: 0px;
      margin: 0px;
      box-sizing: border-box;
    }
  `;

  updatedWidthProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("width")) {
      this.style.setProperty(
        ELEMENT_STYLE_PROPERTIES.WIDTH,
        this.getElementWidth()
      );
    }
  };

  updatedHeightProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("height")) {
      this.style.setProperty(
        ELEMENT_STYLE_PROPERTIES.WIDTH,
        this.getElementHeight()
      );
    }
  };

  updated(changedProperties: Map<string, string>): void {
    console.log("\n updated::", changedProperties);

    this.updatedWidthProperty(changedProperties);
    this.updatedHeightProperty(changedProperties);
  }

  getElementWidth() {
    return getElementDimensionValue(this.width);
  }

  getElementHeight() {
    return getElementDimensionValue(this.height);
  }

  elementPropertiesAsString() {
    return getPropertiesAsString({
      width: this.getElementWidth(),
      height: this.getElementHeight(),
    });
  }
}
