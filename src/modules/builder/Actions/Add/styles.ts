import styled from "styled-components";

export const Wrapper = styled.g`
  ${({
    theme: {
      colorSchemes: {
        palette: {
          builder: { section },
        },
      },
    },
  }) => `
  & g.add-action {
      cursor: pointer;
      & circle {
        fill: ${section};
        cursor: pointer;
      }
      & line {
        stroke: white;
        stroke-width: 4;
        cursor: pointer;
      }
  }

  `}
`;
