import { CSSResult, LitElement } from "lit";
import { PropsDataMap } from "../PropsDataMap";
import styles from "./styles";

export class UIBuildable
  extends LitElement
  implements IBuildable, IBuildableElement
{
  declare props: string;

  static properties = { props: { type: String } };

  protected propData = new PropsDataMap();

  TAKES_CHILDREN = false;
  TITLE = "Element";

  constructor() {
    super();
  }

  static styles: CSSResult[] = [styles];

  connectedCallback(): void {
    super.connectedCallback();

    this.classList.add("ui-buildable");

    this.propData = new PropsDataMap(this.props);
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

  protected getNewValue(prop: string): string | undefined {
    return (
      (this as unknown as Record<string, string>)[prop] ||
      this.propData.get(prop)
    );
  }

  addEventListener(type: unknown, listener: unknown): void {
    const uiRef = this.shadowRoot?.querySelector(".ui-ref");

    if (uiRef) {
      uiRef.addEventListener(type as string, listener as EventListener);
    }
  }

  updateFn = (
    changedProperties: Map<string, string>,
    propName: string,
    cb: (changedProperties: Map<string, string>) => void,
    isInit?: boolean
  ) => {
    if (changedProperties.has(propName) || isInit) {
      cb(changedProperties);
    }
  };

  getProperties() {
    return Array.from(this.propData.keys()).filter((prop) => !!prop);
  }
}
