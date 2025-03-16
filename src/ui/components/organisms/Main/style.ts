
import styled from "styled-components";
import { FlexBox } from "@ui/components/molecules";
import { Box } from "@ui/components/atoms";

export const Wrapper = styled(FlexBox)`
border: 1px solid green;
height: 100%;
padding: 20px;
`;


export const BuilderContainer = styled(Box)`
height: calc(100% - 40px);
`;

export const Controls = styled(Box)`
border: 1px solid red;
height: 40px;
`;