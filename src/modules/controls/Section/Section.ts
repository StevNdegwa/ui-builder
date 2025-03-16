import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UIBlock } from "../Block";

@customElement("ui-section")
export class UISection extends UIBlock {
  constructor() {
    super();
  }

  updated(changedProperties: Map<string, string>) {
    super.updated(changedProperties);
  }

  render() {
    return html`<div class="wrapper"><p>Builder Section</p></div>`;
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
        width?: string;
        height?: string;
      };
    }
  }
}
