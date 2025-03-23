interface IBuildable {
  props: string;
  serializeELement(): void;
}

interface IBuildableElement {
  elementPropertiesAsString?: () => string;
}

interface IBuildableBlockElement {
  width: string | number;
  height: string | number;
}

type IBuildableConfig = Record<string, string>;
