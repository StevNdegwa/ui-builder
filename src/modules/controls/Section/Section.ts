import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UIBlock } from "../Block";
import {
  getElementDimensionValue,
  getPropertiesAsString,
} from "@modules/utils/controls";
import { UIBuildable } from "../Buildable";
import styles from "./styles";
import { ELEMENT_STYLE_PROPERTIES } from "../constants";

@customElement("ui-section")
export class UISection
  extends UIBlock
  implements IBuildableElement, IAppendableElement
{
  TAKES_CHILDREN = true;
  TITLE = "Section";

  constructor() {
    super();
  }

  static {
    UIBuildable.styles.push(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-section");
  }

  updatedHeightProperty = (changedProperties: Map<string, string>) => {
    if (changedProperties.has("height")) {
      let newElHeight = getElementDimensionValue(
        this.height || changedProperties.get("height")
      );

      const isPercentHeight = newElHeight.includes("%");

      newElHeight = isPercentHeight
        ? newElHeight.replace("%", "vh")
        : newElHeight;

      this.style.setProperty(
        ELEMENT_STYLE_PROPERTIES.BLOCK_HEIGHT,
        newElHeight
      );

      this.propData.set("height", newElHeight);
    }
  };

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

  addContent(content: Element) {
    content.setAttribute("slot", "contents");

    this.appendChild(content);
  }

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
