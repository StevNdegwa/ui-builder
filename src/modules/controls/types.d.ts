interface IBuildable {
  props: string;
  elementPropertiesAsString?: ()=> string;
  serializeELement(): void;
}

interface IBuildableBlockElement {
  width: string | number;
  height: string | number;
}

type IBuildableConfig = Record<string, string>
