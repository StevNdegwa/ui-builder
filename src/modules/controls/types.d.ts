interface IBuildable {
  props: string;
  serializeELement(): void;
  TAKES_CHILDREN: boolean;
  TITLE: string;
  propData: Map<string, string>;
}

interface IBuildableElement {
  elementPropertiesAsString?: () => string;
  getValue: (prop: string) => unknown;
}

interface IAppendableElement {
  addContent: (content: Element) => void;
}

interface IBuildableBlockElement {
  width: string | number;
  height: string | number;
}

interface IChartElement<T> {
  initChart: () => void;
  svg: Selection<SVGSVGElement>;
  chartWidth: number;
  chartHeight: number;
  chartData: T;
  chartPadding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  chartWrapper: Selection<SVGGElement>;
  getChartData: () => T;
}

type IBuildableConfig = Record<string, string>;

type BuildableElementNames =
  | "ui-section"
  | "ui-text"
  | "ui-image"
  | "ui-bar-chart";

type BarChartData = { id: string; label: string; value: number };
