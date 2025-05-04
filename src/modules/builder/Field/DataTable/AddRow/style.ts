import styled from "styled-components";
import { FlexBox } from "@ui/components";

export const Wrapper = styled(FlexBox)`
  ${({
    theme: {
      colorSchemes: {
        palette: { success },
      },
      spacings: { padding },
      borderRadius,
    },
  }) => `
    background-color: ${success[500]};
    padding: ${padding.sm};
    border-radius: ${borderRadius.md};
  `}
`;
