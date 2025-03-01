import styled from "styled-components";
import { Box } from "@components/atoms/Box";

export const Wrapper = styled(Box)<{$templateColumns?: string; $templateArea?: string;$templateRows?: string}>`
    display: grid;
    height: 100%;
    ${({ $templateColumns }) => $templateColumns && `grid-template-columns: ${$templateColumns};`}
    ${({ $templateRows }) => $templateRows && `grid-template-rows: ${$templateRows};`}
    ${({ $templateArea }) => $templateArea && `grid-template-areas: ${$templateArea};`};
`;
