import { Box, Button } from "@ui/components";
import styled from "styled-components";

export const Control = styled(Button)<{ $active?: boolean }>`
  max-height: 20px !important;
  min-width: 20px;
  font-weight: bold;
  font-size: 10px;
  box-sizing: border-box;
  padding: 2px 6px;
  &:first-of-type {
    border-radius: 10px 0 0 10px;
  }

  &:last-of-type {
    border-radius: 0 10px 10px 0;
  }
`;

export const InputsWrapper = styled(Box)`
  min-height: 48px;
  max-height: 48px;
`;
