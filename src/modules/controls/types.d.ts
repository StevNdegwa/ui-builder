interface IBuildable {
  elementPropertiesAsString?: ()=> string;
  saveElement(): void;
}

interface IBuildableBlockElement {
  width: string | number;
  height: string | number;
}

type IBuildableConfig = Record<string, string>
