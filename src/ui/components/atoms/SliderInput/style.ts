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
      borderRadius,
    },
  }) => `
    background-color: ${gray[50]};
    color: ${textOnLight};
    border-radius: ${borderRadius.md};
    border: 1px solid ${gray[50]};
    &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }
    &.sm-size {
        height: 32px;
    }
  `}
`;
