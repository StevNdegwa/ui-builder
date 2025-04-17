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

export const Actions = styled.g`
  ${({
    theme: {
      colorSchemes: {
        palette: { secondary, primary },
      },
    },
  }) => `
  & rect {
    cursor: all-scroll;
    fill: ${rgba(secondary[50], 0.2)};
    &.ui-section-action{
      fill: ${rgba(primary[50], 0.2)};
    }
  }
  & line {
    stroke: ${secondary[500]};
    stroke-width: 4;
    cursor: col-resize;
    stroke-linecap: round;

    &.resize-top-thumb, &.resize-bottom-thumb{
        cursor: row-resize;
    }

    &.ui-section-action{
      stroke: ${primary[50]};
    }
  }
    & g.add-action {
        cursor: pointer;
      & circle {
        fill: ${secondary[500]};
        cursor: pointer;
        &.ui-section-action{
          fill: ${primary[500]};
        }
      }
      & line {
        stroke: white;
        stroke-width: 4;
        cursor: pointer;
      }
    }

    & .edit-action {
      cursor: pointer;
      & circle {
        cursor: pointer;
      }
      & path {
        fill: ${secondary[500]};
      }
      &.ui-section-action{
        & path {
          fill: ${primary[500]};
        }
      }
    }

    /** &:hover{
       & rect {
         fill: ${rgba(secondary[50], 0.3)};
       }
    **/ }
  `}
`;
