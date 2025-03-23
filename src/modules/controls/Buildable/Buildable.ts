import { LitElement } from "lit";

export class Buildable extends LitElement implements IBuildable {
  declare props: string;

  static properties = { props: { type: String } };

  propData: Record<string, string> = {};

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
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
