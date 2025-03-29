import styled from "styled-components";
import { FlexBox } from "../FlexBox";
import { Box, Button } from "@ui/components/atoms";
import { rgba } from "polished";

export const Wrapper = styled(Box)<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  ${({ $show }) => `
    display: ${$show ? "block" : "none"};`}
`;

export const Contents = styled(FlexBox)`
  position: absolute;
  top: 50px;
  left: 10%;
  width: 400px;
  height: 450px;
  background-color: white;
  ${({
    theme: {
      borderRadius,
      colorSchemes: {
        palette: { gray },
      },
    },
  }) => `
  border-radius: ${borderRadius.lg};
  box-shadow: 0px 0px 32px ${rgba(gray[500], 0.2)};
  `}}
`;

export const Header = styled(FlexBox)`
  height: 50px;
${({ theme: { spacings } }) => `
  padding-left: ${spacings.padding.md};
  `}}
`;

export const Main = styled(FlexBox)`
  width: 100%;
  height: calc(100% - 70px);
  ${({ theme: { spacings } }) => `
  padding: ${spacings.padding.md};
  `}}
`;

export const Footer = styled(Box)`
  height: 20px;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;
