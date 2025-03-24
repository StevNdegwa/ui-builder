import { LitElement } from "lit";

export class UIBuildable
  extends LitElement
  implements IBuildable, IBuildableElement
{
  declare props: string;

  static properties = { props: { type: String } };

  propData: Map<string, string> = new Map();

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.props) {
      const propData = this.props.split(";");

      propData.forEach((prop) => {
        const [key, value] = prop.split(":");
        this.propData.set(key, value);
      });
    }

    this.classList.add("ui-buildable");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  updated(changedProperties: Map<string, string>): void {
    super.updated(changedProperties);
  }

  elementPropertiesAsString(): string {
    return "";
  }

  serializeELement(): string {
    this.setAttribute("props", this.elementPropertiesAsString());

    return this.outerHTML;
  }
}
