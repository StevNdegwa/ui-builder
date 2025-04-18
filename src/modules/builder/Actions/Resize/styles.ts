import styled from "styled-components";
import { rgba } from "polished";

export const Wrapper = styled.g`
  ${({
    theme: {
      colorSchemes: {
        palette: {
          builder: { section, common },
        },
      },
    },
  }) => `
  
  & rect.resize-overlay {
    cursor: all-scroll;
    fill: ${rgba(common, 0.2)};
    &.ui-section-resize-overlay{
      fill: ${rgba(section, 0.2)};
    }
  }
  
  & line.resize-thumb {
    stroke: ${common};
    stroke-width: 4;
    cursor: col-resize;
    stroke-linecap: round;

    &.resize-top-thumb, &.resize-bottom-thumb{
        cursor: row-resize;
    }

    &.ui-section-resize-thumb {
      stroke: ${section};
    }
  }
  `}
`;
