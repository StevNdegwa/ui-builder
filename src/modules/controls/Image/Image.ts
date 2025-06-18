import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { getPropertiesAsString } from "@modules/utils/controls";
import { UIBuildable } from "../Buildable";
import styles from "./styles";
import { UIBlock } from "../Block";

export const IMAGE_SOURCE_PROP = "image-source";
export const DEFAULT_IMAGE_SOURCE =
  "https://images.unsplash.com/photo-1743832712501-62d9046c57e3?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

@customElement("ui-image")
export class UIImage extends UIBlock implements IBuildableElement {
  TAKES_CHILDREN = false;
  TITLE = "Image";

  declare [IMAGE_SOURCE_PROP]: string;

  constructor() {
    super();

    this.propData.init(IMAGE_SOURCE_PROP, DEFAULT_IMAGE_SOURCE);
  }

  static properties = {
    ...UIBlock.properties,
    [IMAGE_SOURCE_PROP]: { type: String },
  };

  static {
    UIBuildable.styles.push(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-image");
  }

  updated(changedProperties: Map<string, string>) {
    super.updated(changedProperties);
    this.updateFn(
      changedProperties,
      IMAGE_SOURCE_PROP,
      this.updatedImageSrcProperty
    );
  }

  updatedImageSrcProperty = () => {
    const src = this.getNewValue(IMAGE_SOURCE_PROP);

    const imageContainer = this.shadowRoot?.querySelector(
      ".image-wrapper"
    ) as HTMLImageElement;

    if (src) {
      imageContainer.src = src;

      this.propData.set(IMAGE_SOURCE_PROP, src);
    }
  };

  elementPropertiesAsString(): string {
    return (
      getPropertiesAsString(this.propData) + super.elementPropertiesAsString()
    );
  }

  protected firstUpdated(changedProperties: Map<string, string>): void {
    super.firstUpdated(changedProperties);

    this.updateFn(
      changedProperties,
      IMAGE_SOURCE_PROP,
      this.updatedImageSrcProperty,
      true
    );
  }

  render() {
    return html`<img class="image-wrapper" />`;
  }
}

// UIBuildable.styles = styles;

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "ui-image": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        props?: string;
      };
    }
  }
}
