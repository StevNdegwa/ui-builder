import styled from "styled-components";

export const Wrapper = styled.input`
  width: 100%;
  border: none;
  cursor: pointer;
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
    padding: 1%;
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
