import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { UIBlock } from "../Block";
import { getElementDimensionValue } from "@modules/utils/controls";
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

  declare layout: string;

  static properties = {
    ...UIBlock.properties,
    layout: { type: String, attribute: "layout" },
  };

  constructor() {
    super();

    this.propData.init("background-color", "transparent");
    this.propData.init("layout", "single");
  }

  static {
    UIBuildable.styles.push(styles);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-section");
  }

  updatedHeightProperty = () => {
    let newElHeight = getElementDimensionValue(this.getNewValue("height"));

    const isPercentHeight = newElHeight.includes("%");

    newElHeight = isPercentHeight
      ? newElHeight.replace("%", "vh")
      : newElHeight;

    this.style.setProperty(ELEMENT_STYLE_PROPERTIES.BLOCK_HEIGHT, newElHeight);

    return newElHeight;
  };

  updatedLayoutProperty = () => {
    const layout = this.getNewValue("layout");

    return layout;
  };

  updated(changedProperties: Map<string, string>) {
    super.updated(changedProperties);

    this.updateFn(changedProperties, "layout", this.updatedLayoutProperty);
  }

  addContent(content: Element) {
    content.setAttribute("slot", "contents");

    this.appendChild(content);
  }

  render() {
    const layout = this.propData.get("layout") || "single";
    
    if (layout === "two-column") {
      return html`<div class="wrapper ui-ref two-column-layout">
        <slot name="contents" id="content-slot"></slot>
      </div>`;
    }
    
    if (layout === "three-column") {
      return html`<div class="wrapper ui-ref three-column-layout">
        <slot name="contents" id="content-slot"></slot>
      </div>`;
    }
    
    return html`<div class="wrapper ui-ref single-column-layout">
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
