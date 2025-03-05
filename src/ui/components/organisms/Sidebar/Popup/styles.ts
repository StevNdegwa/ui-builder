import { Box, Button } from "@ui/components";
import styled from "styled-components";

export const Wrapper = styled(Box)`
position: relative;
`

export const PopupContent = styled(Box)<{ $show: boolean; }>`
position: absolute;
top:0;
left: 100%;
width: 300px;
height: 400px;
background-color: white;
border: 1px solid black;
display: ${({ $show }) => $show ? "block" : "none"};
z-index: 10;
`

export const PopupButton = styled(Button)`
position: relative;
`;