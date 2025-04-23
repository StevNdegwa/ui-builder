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
      & .builder-icon {
        fill: ${section};
      }
  }
  `}
`;
