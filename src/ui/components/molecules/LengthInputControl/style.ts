import styled from "styled-components";
import { Box, Button } from "@ui/components/atoms";

export const Control = styled(Button)<{ $active?: boolean }>`
  max-height: 28px;
  min-width: 28px;
  font-weight: bold;
  &:first-of-type {
    border-radius: 14px 0 0 14px;
  }

  &:last-of-type {
    border-radius: 0 14px 14px 0;
  }
`;

export const InputsWrapper = styled(Box)`
  min-height: 48px;
  max-height: 48px;
`;
