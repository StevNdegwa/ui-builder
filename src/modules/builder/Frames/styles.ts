import { rgba } from "polished";
import styled from "styled-components";

export const AddActions = styled.g`
  cursor: pointer;
  ${({
    theme: {
      colorSchemes: {
        palette: { primary },
      },
    },
  }) => `
  &  circle {
    fill: ${primary[500]};
}
`}
`;

export const ResizeActions = styled.g`
  ${({
    theme: {
      colorSchemes: {
        palette: { secondary },
      },
    },
  }) => `
  & rect {
    cursor: all-scroll;
    fill: ${rgba(secondary[50], 0.2)};
    &:hover{
        fill: ${rgba(secondary[50], 0.3)};
    }
  }
  & line {
    stroke: ${secondary[500]};
    stroke-width: 4;
    cursor: col-resize;

    &.resize-top-thumb, .resize-bottom-thumb{
        cursor: row-resize;
        }
  }
  `}
`;
