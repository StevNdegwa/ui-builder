import { Grid } from "@ui/components/molecules";
import styled from "styled-components";

export const Wrapper = styled(Grid)`
  height: 100vh;
  ${({ theme }) => `
  background-color: ${theme.colorSchemes.palette.gray[50]};
`}
`;
