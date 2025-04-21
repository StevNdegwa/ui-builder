/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UIBuildable, UIImage, UISection, UIText } from "@modules/controls";
import {
  buildableControlsConfig,
  defaultBuildableControlsConfig,
} from "./configs";
import { Field } from "../Field";
import { ReactNode } from "react";

export class BuildableControl {
  element: UIBuildable;
  uniqueId: string;
  uniqueIdClassName: string;

  constructor(element: UIBuildable, id: string) {
    this.element = element;

    this.uniqueId = id;

    this.uniqueIdClassName = `c${this.uniqueId}`;

    this.element.dataset.uniqueId = id;
  }

  updateProperty(prop: string, value: BuilderFieldValue) {
    // @ts-expect-error
    this.element[prop] = value;
  }

  insertChildElement(name: BuildableElementNames) {
    const buildableInstance: UIBuildable = new ({
      "ui-text": UIText,
      "ui-section": UISection,
      "ui-image": UIImage,
    }[name] || UISection)();

    const childElement = new DOMParser()
      .parseFromString(buildableInstance.serializeELement(), "text/html")
      .body.firstElementChild?.cloneNode(true) as Element;

    childElement.setAttribute("slot", "contents");

    this.element.appendChild(childElement);
  }

  deleteElement() {
    this.element.remove();
  }

  get elementString() {
    return this.element.serializeELement();
  }

  get elementProperties() {
    return Array.from(this.element.propData.keys()).filter((prop) => !!prop);
  }

  get elementPropertiesConfigs() {
    const fields: Array<ReactNode> = [];

    const containsWidthHeight =
      this.elementProperties.includes("width") &&
      this.elementProperties.includes("height");

    if (containsWidthHeight) {
      const sizeConfig = buildableControlsConfig.size;

      const InputField = sizeConfig.component;

      fields.push(
        <Field label={sizeConfig.label} key={`size-x`} name={"size"}>
          <InputField
            name={"size"}
            onChange={(value: string) => {
              if (typeof value !== "string") return;

              const [prop, newValue] = value.split(":");

              this.updateProperty(prop, newValue);
            }}
          />
        </Field>
      );
    }

    return fields.concat(
      this.elementProperties.map((prop: string, index) => {
        if (containsWidthHeight && (prop === "width" || prop === "height"))
          return null;

        const config =
          buildableControlsConfig[
            prop as keyof typeof buildableControlsConfig
          ] || defaultBuildableControlsConfig;

        const InputField = config.component;

        if (InputField) {
          return (
            <Field label={config.label} key={`${prop}-${index}`} name={prop}>
              <InputField
                name={prop}
                onChange={(newValue: string) =>
                  this.updateProperty(prop, newValue)
                }
              />
            </Field>
          );
        }

        return null;
      })
    );
  }

  get elementName() {
    return this.element.tagName.toLowerCase();
  }

  is = {
    text: () => this.element instanceof UIText,
    section: () => this.element instanceof UISection,
    image: () => this.element instanceof UIImage,
    empty: () => this.element.children.length === 0,
  };
}
