import styled from "styled-components";

export const Wrapper = styled.div`
width: 100%;
height: 100%;
position: relative;
padding: 5px;
`

export const SvgWrapper = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
z-index: 4;
`;

export const Contents = styled.div`
width: calc(100% - 10px);
height: calc(100% - 10px);
position: absolute;
top: 0;
left: 0;
z-index: 1;
`;
