import { css } from "lit";

export default css`
  :host(.ui-bar-chart) {
    display: block;
    width: 100%;
    height: 100%;
  }

  :host(.ui-bar-chart) .chart-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  :host(.ui-bar-chart) .ui-chart-svg {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  :host(.ui-bar-chart) .ui-chart-svg text {
    font-size: 12px;
    fill: #666;
  }

  :host(.ui-bar-chart) .ui-chart-svg line {
    stroke: #ddd;
    stroke-width: 1;
  }

  :host(.ui-bar-chart) .ui-chart-svg .grid-layer {
    pointer-events: none;
  }

  :host(.ui-bar-chart) .ui-chart-svg .grid-layer line {
    stroke: #f0f0f0;
    stroke-width: 1;
    stroke-dasharray: 2,2;
  }

  :host(.ui-bar-chart) .ui-chart-svg .axis-layer {
    pointer-events: none;
  }

  :host(.ui-bar-chart) .ui-chart-svg .bar-layer {
    pointer-events: auto;
  }

  :host(.ui-bar-chart) .ui-chart-svg .label-layer {
    pointer-events: none;
  }

  :host(.ui-bar-chart) .ui-chart-svg rect {
    transition: opacity 0.2s ease;
  }

  :host(.ui-bar-chart) .ui-chart-svg rect:hover {
    opacity: 0.8;
  }
`;
