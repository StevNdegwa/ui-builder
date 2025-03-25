import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
`;

export const ScratchpadContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const FrameContainer = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 5;
`;

export const Contents = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  z-index: -1;
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;
