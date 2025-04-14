import { Box, FlexBox } from "@ui/components";
import styled from "styled-components";

export const Wrapper = styled(FlexBox)`
  width: 100%;
  min-height: 100%;
  padding: 10px;
`;

export const Editor = styled(Box)`
  width: calc(100% - 360px);
  min-height: calc(100% - 20px);
  position: relative;
  user-select: none;
  background-color: white;
  overflow: auto;
`;

export const ScratchpadContainer = styled(Box)`
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const Contents = styled(Box)`
  width: calc(100% - 20px);
  min-height: calc(100% - 20px);
  z-index: 1;
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const SettingsForm = styled(Box)`
  width: 340px;
  min-height: calc(100% - 20px);
  background-color: white;
  padding: 10px;
`;
