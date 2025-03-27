import { css, CSSResultGroup } from "lit";
import {
  getElementDimensionValue,
  getPropertiesAsString,
} from "@modules/utils/controls";
import { ELEMENT_STYLE_PROPERTIES } from "../constants";
import { UIBuildable } from "../Buildable";

export class UIBlock
  extends UIBuildable
  implements IBuildableBlockElement, IBuildableElement
{
  declare width: string | number;
  declare height: string | number;
  declare "background-color": string;

  constructor() {
    super();

    // Set default values
    this.propData.set("width", "100%");
    this.propData.set("height", "200px");
    this.propData.set("background-color", "rgb(212, 212, 212)");
  }

  static properties = {
    ...UIBuildable.properties,
    width: { type: String },
    height: { type: String },
    "background-color": { type: String, attribute: "background-color" },
  };

  static styles?: CSSResultGroup = css`
    :host {
      --ui-buildable-element-width: 100%;
      --ui-buildable-element-height: 100%;
      padding: 0px;
      margin: 0px;
      box-sizing: border-box;
      display: block;
    }

    :host > .wrapper {
      width: var(--ui-buildable-element-width);
      height: var(--ui-buildable-element-height);
      background-color: var(--ui-buildable-element-bg-color, transparent);
      padding: 0px;
      margin: 0px;
      box-sizing: border-box;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();

    this.style.setProperty(
      ELEMENT_STYLE_PROPERTIES.WIDTH,
      this.propData.get("width") || "100%"
    );
    this.style.setProperty(
      ELEMENT_STYLE_PROPERTIES.HEIGHT,
      this.propData.get("height") || "100%"
    );
    this.style.setProperty(
      ELEMENT_STYLE_PROPERTIES.BG_COLOR,
      this.propData.get("background-color") || "transparent"
    );

    this.classList.add("ui-block");
  }

  updatedWidthProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("width")) {
      const newElWidth = getElementDimensionValue(
        this.width || changedProperties.get("width")
      );
      this.style.setProperty(ELEMENT_STYLE_PROPERTIES.WIDTH, newElWidth);
      this.propData.set("width", newElWidth);
    }
  };

  updatedHeightProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("height")) {
      const newElHeight = getElementDimensionValue(
        this.height || changedProperties.get("height")
      );
      this.style.setProperty(ELEMENT_STYLE_PROPERTIES.HEIGHT, newElHeight);
      this.propData.set("height", newElHeight);
    }
  };

  updateBackgroundProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("background-color")) {
      const newBgColor = this["background-color"] || "transparent";
      this.style.setProperty(ELEMENT_STYLE_PROPERTIES.BG_COLOR, newBgColor);
      this.propData.set("background-color", newBgColor);
    }
  };

  updated(changedProperties: Map<string, string>): void {
    super.updated(changedProperties);
    this.updatedWidthProperty(changedProperties);
    this.updatedHeightProperty(changedProperties);
    this.updateBackgroundProperty(changedProperties);
  }

  elementPropertiesAsString() {
    return (
      getPropertiesAsString(this.propData) + super.elementPropertiesAsString()
    );
  }
}
