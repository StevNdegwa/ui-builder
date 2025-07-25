import styled from "styled-components";

export const Wrapper = styled.button<{
  $loading?: boolean;
}>`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${({
    theme: {
      colorSchemes: {
        palette: { secondary, primary, gray, success },
        textOnDark,
      },
      spacings: { padding },
      borderRadius,
      fonts,
    },
    $loading,
  }) => `
    background-color: ${primary[500]};
    color: ${textOnDark};
    padding: ${padding.md};
    border-radius: ${borderRadius.md};
    &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }
    &.text-variant {
        background-color: transparent;
        color: ${primary[500]};
        font-weight: ${fonts.weight.body.medium};
    }
    &.outlined-variant {
        background-color: transparent;
        color: ${primary[500]};
        border: 1px solid ${primary[500]};
    }
    &.secondary-color {
        background-color: ${secondary[500]};
        &.outlined-variant {
            background-color: transparent;
            color: ${secondary[500]};
            border: 1px solid ${secondary[500]};
        }
        &.text-variant {
            background-color: transparent;
            color: ${secondary[500]};
        }
    }
    &.gray-color {
        background-color: ${gray[100]};
        &.outlined-variant {
            background-color: transparent;
            color: ${gray[500]};
            border: 1px solid ${gray[500]};
        }
        &.text-variant {
            background-color: transparent;
            color: ${gray[500]};
        }
    }
    &.danger-color {
        background-color: red;
        &.outlined-variant {
            background-color: transparent;
            color: red;
            border: 1px solid red;
        }
        &.text-variant {
            background-color: transparent;
            color: red;
        }
    }
    &.success-color {
        background-color: ${success[500]};
        &.outlined-variant {
            background-color: transparent;
            color: ${success[500]};
            border: 1px solid ${success[500]};
        }
        &.text-variant {
            background-color: transparent;
            color: ${success[500]};
        }
    }
    &.xs-size {
        padding: ${padding.xs};
    }
    &.sm-size {
        padding: ${padding.sm};
    }
    &.lg-size {
        padding: ${padding.lg};
    }
    &.xl-size {
        padding: ${padding.xl};
    }

    @keyframes blink {
        to {
            opacity: 0.5;
        }
    }
    ${$loading && "animation: blink 1s linear infinite;"}
`}
`;
