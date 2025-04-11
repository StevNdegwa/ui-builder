import {
  getElementDimensionValue,
  getPropertiesAsString,
} from "@modules/utils/controls";
import { ELEMENT_STYLE_PROPERTIES } from "../constants";
import { UIBuildable } from "../Buildable";

import styles from "./styles";

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
    this.propData.set("height", "auto");
    this.propData.set("background-color", "rgb(212, 212, 212)");
  }

  static properties = {
    ...UIBuildable.properties,
    width: { type: String },
    height: { type: String },
    "background-color": { type: String, attribute: "background-color" },
  };

  static {
    UIBuildable.styles.push(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.style.setProperty(
      ELEMENT_STYLE_PROPERTIES.BLOCK_WIDTH,
      this.propData.get("width") || "100%"
    );
    this.style.setProperty(
      ELEMENT_STYLE_PROPERTIES.BLOCK_HEIGHT,
      this.propData.get("height") || "100%"
    );
    this.style.setProperty(
      ELEMENT_STYLE_PROPERTIES.BLOCK_BG_COLOR,
      this.propData.get("background-color") || "transparent"
    );

    this.classList.add("ui-block");
  }

  updatedWidthProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("width")) {
      const newElWidth = getElementDimensionValue(
        this.width || changedProperties.get("width")
      );
      this.style.setProperty(ELEMENT_STYLE_PROPERTIES.BLOCK_WIDTH, newElWidth);
      this.propData.set("width", newElWidth);
    }
  };

  updatedHeightProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("height")) {
      const newElHeight = getElementDimensionValue(
        this.height || changedProperties.get("height")
      );
      this.style.setProperty(
        ELEMENT_STYLE_PROPERTIES.BLOCK_HEIGHT,
        newElHeight
      );
      this.propData.set("height", newElHeight);
    }
  };

  updateBackgroundProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("background-color")) {
      const newBgColor = this["background-color"] || "transparent";
      this.style.setProperty(
        ELEMENT_STYLE_PROPERTIES.BLOCK_BG_COLOR,
        newBgColor
      );
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
