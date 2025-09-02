import { html } from "lit";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { customElement } from "lit/decorators.js";
import { UIChart } from "../Chart";
import { UIBuildable } from "../Buildable";
import styles from "./styles";

@customElement("ui-bar-chart")
export class UIBarChart
  extends UIChart<BarChartData[]>
  implements IChartElement<BarChartData[]>
{
  TITLE = "Bar chart";

  yScale = scaleLinear();
  xScale = scaleBand();

  // Helper function to format numbers with thousands separators
  private formatNumber(value: number | string): string {
    // Ensure value is a number
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Check if it's a valid number
    if (isNaN(numValue)) {
      return String(value);
    }
    
    return numValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  static {
    UIBuildable.styles.push(styles);
  }

  constructor() {
    super();

    const data = [
      { id: "sZx1", label: "Jan", value: 10030 },
      { id: "Ed71", label: "Feb", value: 22150 },
      { id: "I819", label: "Mar", value: 16205 },
      { id: "V562", label: "Apr", value: 18115 },
    ];

    this.propData.set("chartData", JSON.stringify(data));
    this.propData.set("barColor", "#4729CE");
  }

  static properties = {
    ...UIChart.properties,
    barColor: { type: String },
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("ui-bar-chart");
  }

  updated(changedProperties: Map<string, string>): void {
    super.updated(changedProperties);

    // Handle width/height changes by reinitializing the chart
    if (changedProperties.has("width") || changedProperties.has("height")) {
      this.initChart();
    }

    this.updateFn(
      changedProperties,
      "chartData",
      this.updateChartData.bind(this)
    );

    this.updateFn(
      changedProperties,
      "barColor",
      this.updateBarColor.bind(this)
    );
  }

  updateBarColor() {
    const newColor = this.getNewValue("barColor") || "#4729CE";
    
    // Update existing bars with new color
    this.chartWrapper
      .selectAll("rect")
      .attr("fill", newColor);

    return newColor;
  }

  updateChartData() {
    const newData = (this.getNewValue("chartData") || []) as BarChartData[];

    // Convert string values to numbers for proper formatting
    const processedData = newData.map(d => ({
      ...d,
      value: typeof d.value === 'string' ? parseFloat(d.value) || 0 : d.value
    }));

    const realChartWidth =
      this.chartWidth - this.chartPadding.left - this.chartPadding.right;

    const realChartHeight =
      this.chartHeight - this.chartPadding.top - this.chartPadding.bottom;

    this.yScale
      .domain([0, max(processedData, (d) => d.value) as number])
      .range([realChartHeight, 0]);

    this.xScale
      .domain(processedData.map((d) => d.label))
      .range([0, realChartWidth])
      .padding(0.1);

    // Update grid lines
    const gridLayer = this.chartWrapper.select(".grid-layer");
    gridLayer.selectAll("*").remove();
    this.addGridLines(gridLayer, realChartWidth);

    const barColor = this.getNewValue("barColor") || "#4729CE";

    // Update bars
    const barLayer = this.chartWrapper.select(".bar-layer");
    barLayer
      .selectAll("rect")
      .data(processedData)
      .join("rect")
      .attr("width", this.xScale.bandwidth)
      .attr("fill", barColor)
      .attr("height", (d) => realChartHeight - this.yScale(d.value))
      .attr("y", (d) => this.yScale(d.value))
      .attr("x", (d) => this.xScale(d.label) as number)
      .attr("rx", 2)
      .attr("ry", 2);

    // Update axes (on top of bars)
    const axisLayer = this.chartWrapper.select(".axis-layer");
    axisLayer.selectAll("*").remove();
    this.addAxesToLayer(axisLayer, realChartWidth, realChartHeight, processedData);

    // Update value labels
    const labelLayer = this.chartWrapper.select(".label-layer");
    
    // Clear the entire label layer and recreate it
    labelLayer.selectAll("*").remove();
    
    // Create a group for each data point with both background and text
    const labelGroups = labelLayer
      .selectAll(".label-group")
      .data(processedData)
      .join("g")
      .attr("class", "label-group");
    
    // Add text labels first (so we can measure them)
    labelGroups
      .append("text")
      .attr("class", "value-label")
      .attr("x", (d) => (this.xScale(d.label) as number) + this.xScale.bandwidth() / 2)
      .attr("y", (d) => this.yScale(d.value) + (realChartHeight - this.yScale(d.value)) / 2 + 4)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .text((d) => this.formatNumber(d.value));
    
    // Now add background rectangles positioned behind the text
    labelGroups.each((_d, i, nodes) => {
      const group = nodes[i] as SVGElement;
      const textElement = group.querySelector('.value-label') as SVGTextElement;
      
      if (textElement && textElement.getBBox) {
        const bbox = textElement.getBBox();
        
        // Create background rectangle with proper dimensions
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "value-label-bg");
        rect.setAttribute("x", String(bbox.x - 4));
        rect.setAttribute("y", String(bbox.y - 2));
        rect.setAttribute("width", String(bbox.width + 8));
        rect.setAttribute("height", String(bbox.height + 4));
        rect.setAttribute("rx", "3");
        rect.setAttribute("ry", "3");
        rect.setAttribute("fill", "white");
        rect.setAttribute("stroke", "#e0e0e0");
        rect.setAttribute("stroke-width", "0.5");
        
        // Insert the background before the text so it appears behind
        group.insertBefore(rect, textElement);
      }
    });

    return JSON.stringify(newData);
  }

  initChart() {
    super.initChart();

    const chartData = this.getChartData() as BarChartData[];

    // Convert string values to numbers for proper formatting
    const processedData = chartData.map(d => ({
      ...d,
      value: typeof d.value === 'string' ? parseFloat(d.value) || 0 : d.value
    }));

    const realChartWidth =
      this.chartWidth - this.chartPadding.left - this.chartPadding.right;

    const realChartHeight =
      this.chartHeight - this.chartPadding.top - this.chartPadding.bottom;

    // Clear existing content
    this.chartWrapper.selectAll("*").remove();

    // Set up scales
    this.yScale
      .domain([0, max(processedData, (d) => d.value) as number])
      .range([realChartHeight, 0]);

    this.xScale
      .domain(processedData.map((d) => d.label))
      .range([0, realChartWidth])
      .padding(0.1);

    // Create layer groups in correct order
    const gridLayer = this.chartWrapper.append("g").attr("class", "grid-layer");
    const barLayer = this.chartWrapper.append("g").attr("class", "bar-layer");
    const axisLayer = this.chartWrapper.append("g").attr("class", "axis-layer");
    const labelLayer = this.chartWrapper.append("g").attr("class", "label-layer");

    // Add grid lines to grid layer (behind everything)
    this.addGridLines(gridLayer, realChartWidth);

    // Add bars to bar layer (on top of grid)
    const barColor = this.getNewValue("barColor") || "#4729CE";

    barLayer
      .selectAll("rect")
      .data(processedData)
      .join("rect")
      .attr("width", this.xScale.bandwidth)
      .attr("fill", barColor)
      .attr("height", (d) => realChartHeight - this.yScale(d.value))
      .attr("y", (d) => this.yScale(d.value))
      .attr("x", (d) => this.xScale(d.label) as number)
      .attr("rx", 2) // Rounded corners
      .attr("ry", 2);

    // Add axes to axis layer (on top of bars)
    this.addAxesToLayer(axisLayer, realChartWidth, realChartHeight, processedData);

    // Add value labels to label layer (on top of everything)
    // Create a group for each data point with both background and text
    const labelGroups = labelLayer
      .selectAll(".label-group")
      .data(processedData)
      .join("g")
      .attr("class", "label-group");
    
    // Add text labels first (so we can measure them)
    labelGroups
      .append("text")
      .attr("class", "value-label")
      .attr("x", (d) => (this.xScale(d.label) as number) + this.xScale.bandwidth() / 2)
      .attr("y", (d) => this.yScale(d.value) + (realChartHeight - this.yScale(d.value)) / 2 + 4)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .text((d) => this.formatNumber(d.value));
    
    // Now add background rectangles positioned behind the text
    labelGroups.each((_d, i, nodes) => {
      const group = nodes[i] as SVGElement;
      const textElement = group.querySelector('.value-label') as SVGTextElement;
      
      if (textElement && textElement.getBBox) {
        const bbox = textElement.getBBox();
        
        // Create background rectangle with proper dimensions
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "value-label-bg");
        rect.setAttribute("x", String(bbox.x - 4));
        rect.setAttribute("y", String(bbox.y - 2));
        rect.setAttribute("width", String(bbox.width + 8));
        rect.setAttribute("height", String(bbox.height + 4));
        rect.setAttribute("rx", "3");
        rect.setAttribute("ry", "3");
        rect.setAttribute("fill", "white");
        rect.setAttribute("stroke", "#e0e0e0");
        rect.setAttribute("stroke-width", "0.5");
        
        // Insert the background before the text so it appears behind
        group.insertBefore(rect, textElement);
      }
    });
  }

  addAxes(chartWidth: number, chartHeight: number) {
    const chartData = this.getChartData() as BarChartData[];
    this.updateAxes(chartWidth, chartHeight, chartData);
  }

  addGridLines(gridLayer: any, chartWidth: number) {
    const chartData = this.getChartData() as BarChartData[];
    const maxValue = max(chartData, (d) => d.value) as number;
    
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const value = (maxValue / yTicks) * i;
      const y = this.yScale(value);
      
      // Grid line
      gridLayer
        .append("line")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", chartWidth)
        .attr("y2", y)
        .attr("stroke", "#f0f0f0")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");
    }
  }

  addAxesToLayer(axisLayer: any, chartWidth: number, chartHeight: number, chartData: BarChartData[]) {
    const maxValue = max(chartData, (d) => d.value) as number;

    // Add Y-axis (vertical)
    const yAxis = axisLayer.append("g").attr("class", "y-axis");
    
    // Y-axis line
    yAxis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", chartHeight)
      .attr("stroke", "#666")
      .attr("stroke-width", 2);

    // Y-axis ticks and labels
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const value = (maxValue / yTicks) * i;
      const y = this.yScale(value);

      // Tick line
      yAxis
        .append("line")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", 5)
        .attr("y2", y)
        .attr("stroke", "#666")
        .attr("stroke-width", 1);

      // Tick label background
      const labelText = this.formatNumber(value);
      const labelNode = yAxis.append("text")
        .attr("x", 15)
        .attr("y", y + 4)
        .attr("dy", "0.32em")
        .attr("text-anchor", "start")
        .attr("fill", "#666")
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .text(labelText);

      // Add white background rectangle behind the text
      const bbox = labelNode.node()?.getBBox();
      if (bbox) {
        yAxis.insert("rect", "text:last-child")
          .attr("class", "y-axis-label-bg")
          .attr("x", bbox.x - 4)
          .attr("y", bbox.y - 2)
          .attr("width", bbox.width + 8)
          .attr("height", bbox.height + 4)
          .attr("fill", "white")
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("stroke", "#e0e0e0")
          .attr("stroke-width", 0.5);
      }
    }

    // Add X-axis (horizontal)
    const xAxis = axisLayer.append("g").attr("class", "x-axis");
    
    // X-axis line
    xAxis
      .append("line")
      .attr("x1", 0)
      .attr("y1", chartHeight)
      .attr("x2", chartWidth)
      .attr("y2", chartHeight)
      .attr("stroke", "#666")
      .attr("stroke-width", 2);

    // X-axis labels
    chartData.forEach((d) => {
      const x = (this.xScale(d.label) as number) + this.xScale.bandwidth() / 2;
      
      xAxis
        .append("text")
        .attr("x", x)
        .attr("y", chartHeight + 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#666")
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .text(d.label);
    });
  }

  updateAxes(chartWidth: number, chartHeight: number, chartData: BarChartData[]) {
    const maxValue = max(chartData, (d) => d.value) as number;

    // Remove existing axes and grid
    this.chartWrapper.selectAll(".grid").remove();
    this.chartWrapper.selectAll(".y-axis").remove();
    this.chartWrapper.selectAll(".x-axis").remove();

    // Add grid lines FIRST (insert at beginning to ensure they're behind everything)
    const gridGroup = this.chartWrapper.insert("g", ":first-child").attr("class", "grid");
    
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const value = (maxValue / yTicks) * i;
      const y = this.yScale(value);
      
      // Grid line
      gridGroup
        .append("line")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", chartWidth)
        .attr("y2", y)
        .attr("stroke", "#f0f0f0")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");
    }

    // Add Y-axis (vertical)
    const yAxis = this.chartWrapper.append("g").attr("class", "y-axis");
    
    // Y-axis line
    yAxis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", chartHeight)
      .attr("stroke", "#666")
      .attr("stroke-width", 2);

    // Y-axis ticks and labels
    for (let i = 0; i <= yTicks; i++) {
      const value = (maxValue / yTicks) * i;
      const y = this.yScale(value);

      // Tick line
      yAxis
        .append("line")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", 5)
        .attr("y2", y)
        .attr("stroke", "#666")
        .attr("stroke-width", 1);

      // Tick label background
      const labelText = this.formatNumber(value);
      const labelNode = yAxis.append("text")
        .attr("x", 18)
        .attr("y", y + 4)
        .attr("dy", "0.32em")
        .attr("text-anchor", "start")
        .attr("fill", "#666")
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .text(labelText);

      // Add white background rectangle behind the text
      const bbox = labelNode.node()?.getBBox();
      if (bbox) {
        yAxis.insert("rect", "text:last-child")
          .attr("class", "y-axis-label-bg")
          .attr("x", bbox.x - 4)
          .attr("y", bbox.y - 2)
          .attr("width", bbox.width + 8)
          .attr("height", bbox.height + 4)
          .attr("fill", "white")
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("stroke", "#e0e0e0")
          .attr("stroke-width", 0.5);
      }
    }

    // Add X-axis (horizontal)
    const xAxis = this.chartWrapper.append("g").attr("class", "x-axis");
    
    // X-axis line
    xAxis
      .append("line")
      .attr("x1", 0)
      .attr("y1", chartHeight)
      .attr("x2", chartWidth)
      .attr("y2", chartHeight)
      .attr("stroke", "#666")
      .attr("stroke-width", 2);

    // X-axis labels
    chartData.forEach((d) => {
      const x = (this.xScale(d.label) as number) + this.xScale.bandwidth() / 2;
      
      xAxis
        .append("text")
        .attr("x", x)
        .attr("y", chartHeight + 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#666")
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .text(d.label);
    });
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
