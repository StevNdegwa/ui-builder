import styled from "styled-components";

export const Thumb = styled.circle`
height: 10px;
width: 10px;
fill: white;
stroke: black;
cursor: col-resize;
stroke-width: 1;
`;

export const Indicator = styled.line<{ $show: boolean }>`
stroke: ${({ $show }) => $show ? "black" : "none"};
stroke-width: 1;
`;