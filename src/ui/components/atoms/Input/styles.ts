import styled from "styled-components";

export const Wrapper = styled.input`
  display: inline-block;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  ${({
    theme: {
      colorSchemes: {
        palette: { gray },
        textOnLight,
      },
      spacings: { padding },
      borderRadius,
    },
  }) => `
    background-color: ${gray[50]};
    color: ${textOnLight};
    padding: ${padding.md};
    border-radius: ${borderRadius.md};
    border: 1px solid ${gray[100]};
    &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }
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
