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
    & path.edit-action {
      fill: ${common};
    }
    &.ui-section-edit-actions-group{
      & path.edit-action {
        fill: ${section};
      }
    }
  }
  `}
`;
