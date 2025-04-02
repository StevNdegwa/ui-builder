import { Button, FlexBox } from "@ui/components";
import styled from "styled-components";

export const Wrapper = styled(FlexBox)<{ $show: boolean }>`
  ${({ $show }) => `
  display: ${$show ? "flex" : "none"};
`}
`;

export const FormButton = styled(Button)`
  width: 100%;
`;
