import styled from "styled-components";

export const InputWrapper = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  border: none;
  cursor: pointer;
  box-shadow: none;
  pointer-events: all;
`;

export const ColorPreview = styled.div`
  width: 100%;
  height: 24px;
  -webkit-appearance: none;
  pointer-events: none;
  ${({
    theme: {
      colorSchemes: {
        palette: { gray },
      },
      borderRadius,
    },
  }) => `
    border: 4px solid ${gray[50]};
    border-radius: ${borderRadius.md};
    &:disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }
    &.sm-size {
      height: 32px;
    }
  `}
`;
