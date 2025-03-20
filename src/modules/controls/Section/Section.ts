import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UIBlock } from "../Block";
import { getPropertiesAsString } from "@modules/utils/controls";

@customElement("ui-section")
export class UISection extends UIBlock {
  constructor() {
    super();
  }

  updated(changedProperties: Map<string, string>) {
    super.updated(changedProperties);
  }

  elementPropertiesAsString(): string {
    return getPropertiesAsString({}) + super.elementPropertiesAsString();
  }

  render() {
    return html`<div class="wrapper">Builder Section</div>`;
  }
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "ui-section": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        props?: string;
      };
    }
  }
}
