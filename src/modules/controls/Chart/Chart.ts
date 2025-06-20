import { create } from "d3-selection";
import { UIBlock } from "../Block";

export class UIChart<T>
  extends UIBlock
  implements IChartElement<T>, IBuildableElement
{
  TITLE = "Chart";

  svg = create("svg");

  chartWrapper = this.svg.append("g");

  chartWidth: number = 0;
  chartHeight: number = 0;

  chartPadding = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40,
  };

  declare chartData: T;

  constructor() {
    super();

    this.propData.set("width", "100%");
    this.propData.set("height", "500px");
    this.propData.set("background-color", "white");
    this.propData.init("chartData", JSON.stringify([]));
  }

  static properties = {
    ...UIBlock.properties,
    chartData: { type: Array },
  };

  connectedCallback(): void {
    super.connectedCallback();

    this.classList.add("ui-chart");
  }

  initChart() {
    this.svg.classed("ui-chart-svg", true);

    const wrapper = this.shadowRoot?.querySelector(
      ".chart-wrapper"
    ) as HTMLDivElement;

    wrapper.style.width = this.propData.get("width") || "100%";
    wrapper.style.height = this.propData.get("height") || "500px";

    const { width, height } = wrapper.getBoundingClientRect();

    this.chartWidth = width;
    this.chartHeight = height;

    this.svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    this.chartWrapper.attr(
      "transform",
      `translate(${this.chartPadding.left}, ${this.chartPadding.top})`
    );

    wrapper?.appendChild(this.svg.node() as SVGSVGElement);
  }

  getChartData(): T {
    const table = this.propData.get("chartData");

    if (!table) return [] as T;

    return (JSON.parse(table) || []) as T;
  }

  updated(changedProperties: Map<string, string>): void {
    super.updated(changedProperties);
  }

  protected firstUpdated(changedProperties: Map<string, string>): void {
    super.firstUpdated(changedProperties);
    this.initChart();
  }

  getValue(prop: string): unknown {
    if (prop === "chartData") {
      return this.getChartData();
    }

    return super.getValue(prop);
  }
}
