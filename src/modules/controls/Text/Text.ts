import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { getPropertiesAsString } from "@modules/utils/controls";
import { UIBuildable } from "../Buildable";

export const TEXT_CONTENT_PROP = "text-content";

@customElement("ui-text")
export class UIText extends UIBuildable implements IBuildableElement {
  declare [TEXT_CONTENT_PROP]: string;

  constructor() {
    super();
    this.propData.set(TEXT_CONTENT_PROP, "A very simple text");
  }

  static properties = {
    ...UIBuildable.properties,
    [TEXT_CONTENT_PROP]: { type: String },
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-text");
  }

  updated(changedProperties: Map<string, string>) {
    super.updated(changedProperties);
    this.updatedContentProperty(changedProperties);
  }

  updatedContentProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has(TEXT_CONTENT_PROP)) {
      const newContent = this[TEXT_CONTENT_PROP] || ("" as string);

      const textContainer = this.shadowRoot?.querySelector(".text-wrapper");

      if (textContainer) {
        textContainer.innerHTML = newContent;
      }

      this.propData.set(TEXT_CONTENT_PROP, newContent);
    }
  };

  elementPropertiesAsString(): string {
    return (
      getPropertiesAsString(this.propData) + super.elementPropertiesAsString()
    );
  }

  render() {
    return html`<span class="text-wrapper">Sample Content</span>`;
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
