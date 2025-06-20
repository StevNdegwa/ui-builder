import { html } from "lit";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { customElement } from "lit/decorators.js";
import { UIChart } from "../Chart";

@customElement("ui-bar-chart")
export class UIBarChart
  extends UIChart<BarChartData[]>
  implements IChartElement<BarChartData[]>
{
  TITLE = "Bar chart";

  yScale = scaleLinear();
  xScale = scaleBand();

  constructor() {
    super();

    const data = [
      { id: "sZx1", label: "Jan", value: 10030 },
      { id: "Ed71", label: "Feb", value: 22150 },
      { id: "I819", label: "Mar", value: 16205 },
      { id: "V562", label: "Apr", value: 18115 },
    ];

    this.propData.set("chartData", JSON.stringify(data));
  }

  static properties = {
    ...UIChart.properties,
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-bar-chart");
  }

  updated(changedProperties: Map<string, string>): void {
    super.updated(changedProperties);

    this.updateFn(
      changedProperties,
      "chartData",
      this.updateChartData.bind(this)
    );
  }

  updateChartData() {
    const newData = (this.getNewValue("chartData") || []) as BarChartData[];

    const realChartHeight =
      this.chartHeight - this.chartPadding.top - this.chartPadding.bottom;

    this.yScale.domain([0, max(newData, (d) => d.value) as number]);
    this.xScale.domain(newData.map((d) => d.label));

    this.chartWrapper
      .selectAll("rect")
      .data(newData)
      .join("rect")
      .attr("width", this.xScale.bandwidth)
      .attr("fill", "orange")
      .attr("height", (d) => this.yScale(d.value))
      .attr("y", (d) => realChartHeight - this.yScale(d.value))
      .attr("x", (d) => this.xScale(d.label) as number);

    return JSON.stringify(newData);
  }

  initChart() {
    super.initChart();

    const chartData = this.getChartData() as BarChartData[];

    const realChartWidth =
      this.chartWidth - this.chartPadding.left - this.chartPadding.right;

    const realChartHeight =
      this.chartHeight - this.chartPadding.top - this.chartPadding.bottom;

    this.yScale
      .domain([0, max(chartData, (d) => d.value) as number])
      .range([0, realChartHeight]);

    this.xScale
      .domain(chartData.map((d) => d.label))
      .range([0, realChartWidth])
      .padding(0.1);

    this.chartWrapper
      .selectAll("rect")
      .data(chartData)
      .join("rect")
      .attr("width", this.xScale.bandwidth)
      .attr("fill", "orange")
      .attr("height", (d) => this.yScale(d.value))
      .attr("y", (d) => realChartHeight - this.yScale(d.value))
      .attr("x", (d) => this.xScale(d.label) as number);
  }

  protected firstUpdated(changedProperties: Map<string, string>): void {
    super.firstUpdated(changedProperties);
    this.initChart();
  }

  render() {
    return html`<div class="chart-wrapper"></div>`;
  }
}

declare module "react" {
  interface IntrinsicElements {
    "ui-bar-chart": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      props?: string;
    };
  }
}
