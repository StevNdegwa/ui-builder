import { CSSResult, LitElement } from "lit";
import { PropsDataMap } from "../PropsDataMap";
import styles from "./styles";

export class UIBuildable
  extends LitElement
  implements IBuildable, IBuildableElement
{
  declare props: string;

  static properties = { props: { type: String } };

  propData = new PropsDataMap();

  TAKES_CHILDREN = false;
  TITLE = "Element";

  constructor() {
    super();
  }

  static styles: CSSResult[] = [styles];

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

  getValue(prop: string): unknown {
    return this.propData.get(prop);
  }

  addEventListener(type: unknown, listener: unknown): void {
    const uiRef = this.shadowRoot?.querySelector(".ui-ref");

    console.log("uiRef", uiRef);

    if (uiRef) {
      uiRef.addEventListener(type as string, listener as EventListener);
    }
  }
}
