import styled from "styled-components";
import { FlexBox } from "@ui/components/molecules";
import { Box } from "@ui/components/atoms";

export const Wrapper = styled(FlexBox)`
  height: 100%;
  box-sizing: border-box;
`;

export const BuilderContainer = styled(Box)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ${({
    theme: {
      colorSchemes: {
        palette: { gray },
      },
    },
  }) => `
  box-shadow: 0 0 16px 0 ${gray[100]};
  `}
`;

export const Controls = styled(FlexBox)`
  height: 60px;
  padding: 0 10px;
  box-sizing: border-box;
`;
