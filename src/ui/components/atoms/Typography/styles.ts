import styled from "styled-components";

export const Wrapper = styled.span`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: var(--dark-color);
  font-size: var(--text-size-md);
  font-family: var(--font-family);

  &.outline-text-variant {
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px;
  }

  &.text-align-left {
    text-align: left;
  }

  &.text-align-center {
    text-align: center;
  }

  &.text-align-right {
    text-align: right;
  }

  ${({
    theme: {
      fonts: {
        size: {
          body: { xs, sm, md, lg, xl, xxl, xxxl },
        },
        weight: {
          body: { light, regular, medium, bold },
        },
      },
    },
  }) => `
    &.sm-text-size {
        font-size: ${xs};
    }
    &.sm-text-size {
        font-size: ${sm};
    }
    &.md-text-size {
        font-size: ${md};
    }
    &.lg-text-size {
        font-size: ${lg};
    }
    &.xl-text-size {
        font-size: ${xl};
    }
    &.xxl-text-size {
        font-size: ${xxl};
    }
    &.xxl-text-size {
        font-size:${xxxl};
    }
    &.light-text-weight {
        font-weight:${light};
    }
    &.regular-text-weight {
        font-weight:${regular};
    }
    &.medium-text-weight {
        font-weight:${medium};
    }
    &.bold-text-weight {
        font-weight:${bold};
    }
  `}
`;
