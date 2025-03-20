import styled from "styled-components";
import { Box } from "@ui/components/atoms";
import icon from "@media/images/app-icon.png";
import { FlexBox } from "@ui/components/molecules";

export const Wrapper = styled(FlexBox)`
  background-color: white;
  height: 100%;
  padding-left: 10px;
`;

export const AppIcon = styled(Box)`
  width: 40px;
  height: 40px;
  background-image: url("${icon}");
  background-size: 100% 100%;
  background-position: center center;
  border: 4px solid white;
  box-shadow: 0px 0px 4px ${({ theme }) => theme.colorSchemes.palette.gray[600]};
  border-radius: 50%;
`;
