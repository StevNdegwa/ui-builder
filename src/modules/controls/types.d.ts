interface IBuildable {
  props: string;
  serializeELement(): void;
  TAKES_CHILDREN: boolean;
  propData: Map<string, string>;
}

interface IBuildableElement {
  elementPropertiesAsString?: () => string;
}

interface IBuildableBlockElement {
  width: string | number;
  height: string | number;
}

type IBuildableConfig = Record<string, string>;

type BuildableElementNames = "ui-section" | "ui-text" | "ui-image";
