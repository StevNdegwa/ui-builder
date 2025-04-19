import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UIBlock } from "../Block";
import { getPropertiesAsString } from "@modules/utils/controls";
import { UIBuildable } from "../Buildable";
import styles from "./styles";

@customElement("ui-section")
export class UISection extends UIBlock implements IBuildableElement {
  constructor() {
    super();
    this.TAKES_CHILDREN = true;
  }

  static {
    UIBuildable.styles.push(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-section");
  }

  updated(changedProperties: Map<string, string>) {
    super.updated(changedProperties);
  }

  elementPropertiesAsString(): string {
    return (
      getPropertiesAsString(this.propData) + super.elementPropertiesAsString()
    );
  }

  // protected firstUpdated(): void {
  //   const contentSlot = this.renderRoot?.querySelector(
  //     "#content-slot"
  //   ) as HTMLSlotElement;

  //   if (contentSlot) {
  //     contentSlot.addEventListener("slotchange", (event) => {
  //       // Set height
  //       console.log("slotchange", event, contentSlot.assignedNodes().length);
  //     });
  //   }
  // }

  render() {
    return html`<div class="wrapper ui-ref">
      <slot name="contents" id="content-slot"></slot>
    </div>`;
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
