import styled from "styled-components";
import { Box, Button, Input, Typography } from "@ui/components/atoms";
import { DropDown } from "@ui/components";

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

export const DropDownWrapper = styled(DropDown)`
  width: 50px;
`;

export const SizeInput = styled(Input)`
  width: 80px;
`;

export const TextWrapper = styled(Typography)`
  display: block;
  width: 80px;
`;
