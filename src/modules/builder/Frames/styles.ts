import { rgba } from "polished";
import styled from "styled-components";

export const Overlay = styled.g`
  cursor: all-scroll;
  fill: transparent;
  ${({
    theme: {
      colorSchemes: {
        palette: { secondary },
      },
    },
  }) => `
    &:hover{
        fill: ${rgba(secondary[50], 0.3)};
    }
  `}
`;

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
