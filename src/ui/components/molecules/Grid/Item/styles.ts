import styled from "styled-components";
import { Box } from "@ui/components/atoms/Box";


export const Wrapper = styled(Box)<{$columnStart?:number; $columnEnd?:number; $area?:string}>`
${({ $columnStart }) => $columnStart && `grid-column-start: ${$columnStart};`}
${({ $columnEnd }) => $columnEnd && `grid-column-end: ${$columnEnd};`}
${({ $area }) => $area && `grid-area: ${$area};`}
`;