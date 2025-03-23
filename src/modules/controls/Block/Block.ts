import { css, CSSResultGroup } from "lit";
import {
  getElementDimensionValue,
  getPropertiesAsString,
} from "@modules/utils/controls";
import { ELEMENT_STYLE_PROPERTIES } from "../constants";
import { Buildable } from "../Buildable";

export class UIBlock
  extends Buildable
  implements IBuildableBlockElement, IBuildableElement
{
  declare width: string | number;
  declare height: string | number;

  constructor() {
    super();
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

  connectedCallback(): void {
    super.connectedCallback();
    this.updatedWidthProperty(this.propData);
    this.updatedHeightProperty(this.propData);
  }

  updatedWidthProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("width")) {
      const newElWidth = getElementDimensionValue(
        changedProperties.get("width")
      );
      this.style.setProperty(ELEMENT_STYLE_PROPERTIES.WIDTH, newElWidth);
      this.propData.set("width", newElWidth);
    }
  };

  updatedHeightProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("height")) {
      const newElHeight = getElementDimensionValue(
        changedProperties.get("height")
      );
      this.style.setProperty(ELEMENT_STYLE_PROPERTIES.HEIGHT, newElHeight);
      this.propData.set("height", newElHeight);
    }
  };

  updated(changedProperties: Map<string, string>): void {
    super.updated(changedProperties);
    this.updatedWidthProperty(changedProperties);
    this.updatedHeightProperty(changedProperties);
  }

  elementPropertiesAsString() {
    return (
      getPropertiesAsString(this.propData) + super.elementPropertiesAsString()
    );
  }
}
