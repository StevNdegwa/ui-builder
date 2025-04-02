import styled from "styled-components";

export const Wrapper = styled.textarea`
  display: inline-block;
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
  ${({
    theme: {
      colorSchemes: {
        palette: { gray },
      },
      spacings: { padding },
      borderRadius,
    },
  }) => `
  border: 1px solid ${gray[100]};
  border-radius: ${borderRadius.md};
  padding: ${padding.md};
  background-color: ${gray[50]};
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
    &.sm-size {
        height: 32px;
    }
  `}
`;
