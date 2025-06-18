import { create } from "d3-selection";
import { UIBlock } from "../Block";
import { getPropertiesAsString } from "@modules/utils/controls";

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
    this.propData.set("chartData", JSON.stringify([]));
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

    const wrapper = this.shadowRoot?.querySelector(
      ".wrapper"
    ) as HTMLDivElement;

    this.chartWidth = wrapper.getBoundingClientRect().width;
    this.chartHeight = 500;

    this.svg
      .attr("width", this.chartWidth)
      .attr("height", this.chartHeight)
      .attr("viewBox", [0, 0, this.chartWidth, this.chartHeight]);

    this.chartWrapper.attr(
      "transform",
      `translate(${this.chartPadding.left}, ${this.chartPadding.top})`
    );

    this.initChart();

    wrapper?.appendChild(this.svg.node() as SVGSVGElement);
  }

  getValue(prop: string): unknown {
    if (prop === "chartData") {
      return this.getChartData();
    }

    return super.getValue(prop);
  }

  elementPropertiesAsString() {
    return (
      getPropertiesAsString(this.propData) + super.elementPropertiesAsString()
    );
  }
}
