import styled from "styled-components";

export const Wrapper = styled.rect`
  fill: rgba(255, 255, 255, 0);
  stroke: none;
`;

export const GridLabelsX = styled.g`
  transform: translate(0px, 8px);
  stroke: none;
  & > text {
    font-size: 8px;
    text-anchor: end;
    &:first-of-type {
      text-anchor: start;
    }
  }
`;

export const GridLabelsY = styled.g`
  transform: translate(4px, 0px);
  stroke: none;
  & > text {
    font-size: 8px;
    text-anchor: end;
    &:first-of-type {
      opacity: 0;
    }
  }
`;

export const XYIndicator = styled.line`
  stroke: rgba(64, 63, 76, 0.2);
  fill: none;
  stroke-width: 0.5;
`;
