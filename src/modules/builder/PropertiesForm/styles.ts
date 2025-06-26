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
        palette: { secondary },
      },
    },
  }) => `
    background-color: ${secondary[500]};
    color: white;
    border-radius: ${sm};
  `}
`;
