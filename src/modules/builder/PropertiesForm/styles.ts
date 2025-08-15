import { FlexBox } from "@ui/components";
import styled from "styled-components";

export const Wrapper = styled(FlexBox)<{ $show: boolean }>`
  ${({ $show }) => `
  display: ${$show ? "flex" : "none"};
`}
`;

export const FormTitle = styled(FlexBox)`
  height: 40px;
  text-transform: uppercase;
  padding-left: 8px;
  ${({
    theme: {
      borderRadius: { sm },
      colorSchemes: {
        palette: { secondary, gray },
      },
    },
  }) => `
    background-color: ${secondary[500]};
    color: white;
    border-radius: ${sm};
    &.document-title {
      background-color: transparent;
      color: ${gray[900]};
      font-weight: bold;
      padding-left: 0;
      height: 20px;
    }
  `}
`;
