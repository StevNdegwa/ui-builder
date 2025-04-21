import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colorSchemes.palette.gray[50]};

  &.xs-divider {
    height: 1px;
  }
  &.sm-divider {
    height: 2px;
  }
  &.md-divider {
    height: 4px;
  }
  &.lg-divider {
    height: 8px;
  }
  &.xl-divider {
    height: 12px;
  }
`;
