import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { getPropertiesAsString } from "@modules/utils/controls";
import { UIBuildable } from "../Buildable";
import styles from "./styles";

export const TEXT_CONTENT_PROP = "text-content";

@customElement("ui-text")
export class UIText extends UIBuildable implements IBuildableElement {
  declare [TEXT_CONTENT_PROP]: string;

  TAKES_CHILDREN = false;
  TITLE = "Text";

  constructor() {
    super();
    this.propData.init(TEXT_CONTENT_PROP, "Your text here...");
  }

  static properties = {
    ...UIBuildable.properties,
    [TEXT_CONTENT_PROP]: { type: String },
  };

  static {
    UIBuildable.styles.push(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-text");
  }

  updated(changedProperties: Map<string, string>) {
    super.updated(changedProperties);
    this.updateFn(
      changedProperties,
      "text-content",
      this.updatedContentProperty
    );
  }

  updatedContentProperty = () => {
    const newContent = this.getNewValue(TEXT_CONTENT_PROP) || ("" as string);

    const textContainer = this.shadowRoot?.querySelector(".text-wrapper");

    if (textContainer) {
      textContainer.innerHTML = newContent;
    }

    this.propData.set(TEXT_CONTENT_PROP, newContent);
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
      "text-content",
      this.updatedContentProperty,
      true
    );
  }

  render() {
    return html`<span class="text-wrapper"></span>`;
  }
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "ui-text": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        props?: string;
      };
    }
  }
}
