import { getElementDimensionValue } from "@modules/utils/controls";
import { ELEMENT_STYLE_PROPERTIES } from "../constants";
import { UIBuildable } from "../Buildable";

import styles from "./styles";

export class UIBlock
  extends UIBuildable
  implements IBuildableBlockElement, IBuildableElement
{
  TAKES_CHILDREN = false;
  TITLE = "Block";

  declare width: string | number;
  declare height: string | number;
  declare "background-color": string;

  constructor() {
    super();

    // Set default values
    this.propData.init("width", "100%");
    this.propData.init("height", "auto");
    this.propData.init("background-color", "#f0f3f4");
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

    this.classList.add("ui-block");
  }

  updatedWidthProperty = () => {
    const newElWidth = getElementDimensionValue(this.getNewValue("width"));
    this.style.setProperty(ELEMENT_STYLE_PROPERTIES.BLOCK_WIDTH, newElWidth);
    return newElWidth;
  };

  updatedHeightProperty = () => {
    const newElHeight = getElementDimensionValue(this.getNewValue("height"));
    this.style.setProperty(ELEMENT_STYLE_PROPERTIES.BLOCK_HEIGHT, newElHeight);
    return newElHeight;
  };

  updateBackgroundProperty = () => {
    const newBgColor = this.getNewValue("background-color");

    if (!newBgColor) return;

    this.style.setProperty(ELEMENT_STYLE_PROPERTIES.BLOCK_BG_COLOR, newBgColor);

    return newBgColor;
  };

  updated(changedProperties: Map<string, string>): void {
    super.updated(changedProperties);
    this.updateFn(changedProperties, "width", this.updatedWidthProperty);
    this.updateFn(changedProperties, "height", this.updatedHeightProperty);
    this.updateFn(
      changedProperties,
      "background-color",
      this.updateBackgroundProperty
    );
  }

  protected firstUpdated(changedProperties: Map<string, string>): void {
    super.firstUpdated(changedProperties);

    this.updateFn(changedProperties, "width", this.updatedWidthProperty, true);
    this.updateFn(
      changedProperties,
      "height",
      this.updatedHeightProperty,
      true
    );
    this.updateFn(
      changedProperties,
      "background-color",
      this.updateBackgroundProperty,
      true
    );
  }
}
