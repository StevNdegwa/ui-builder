import { FlexBox } from "@ui/components";
import styled from "styled-components";

export const Wrapper = styled(FlexBox)`
  width: 100px;
  height: 100px;
  cursor: pointer;
  ${({ theme }) => `
  border: 1px solid ${theme.colorSchemes.palette.gray[100]};
  border-radius: ${theme.borderRadius.md};
  `};
`;

export const Icon = styled(FlexBox)`
  width: 100%;
  height: 70px;
`;

export const Label = styled(FlexBox)`
  height: 30px;
`;
