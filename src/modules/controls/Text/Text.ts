import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { getPropertiesAsString } from "@modules/utils/controls";
import { UIBuildable } from "../Buildable";

@customElement("ui-text")
export class UIText extends UIBuildable implements IBuildableElement {
  declare content: string;

  constructor() {
    super();
    this.propData.set("content", "A very simple text");
  }

  static properties = {
    ...UIBuildable.properties,
    content: { type: String },
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
    if (changedProperties.has("content")) {
      const newContent = changedProperties.get("content") as string;

      const textContainer = this.querySelector(".wrapper");

      if (textContainer) textContainer.innerHTML = newContent;

      this.propData.set("content", newContent);
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
