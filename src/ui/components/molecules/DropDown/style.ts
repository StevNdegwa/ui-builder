import styled from "styled-components";

export const Wrapper = styled.select`
  display: block;
  width: 100%;
  height: 48px;
  ${({
    theme: {
      borderRadius: { md },
      colorSchemes: {
        palette: { gray },
      },
    },
  }) => `
    background-color: ${gray[50]};
    border-radius: ${md};
    border: 1px solid ${gray[100]};
    padding: 0 4px;
    cursor: pointer;
    &.xs-size {
        height: 24px;
    }
    &.sm-size {
        height: 32px;
    }
    &.md-size {
        height: 48px;
    }
    &.lg-size {
        height: 64px;
    }
  `}
`;
