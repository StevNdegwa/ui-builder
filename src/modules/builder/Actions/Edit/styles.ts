import styled from "styled-components";

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
  & .edit-actions-group {
    cursor: pointer;
    & circle {
      cursor: pointer;
    }
    & path {
      fill: ${common};
    }
    &.ui-section-edit-actions-group{
      & path {
        fill: ${section};
      }
    }
  }
  `}
`;
