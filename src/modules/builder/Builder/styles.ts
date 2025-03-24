import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
`;

export const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
`;

export const Contents = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
