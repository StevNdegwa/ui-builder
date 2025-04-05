import { FlexBox } from "@ui/components";
import styled from "styled-components";

export const Wrapper = styled(FlexBox)<{ $show: boolean }>`
  ${({ $show }) => `
  display: ${$show ? "flex" : "none"};
`}
`;
