import { Box, IconButton } from "@ui/components";
import styled from "styled-components";

export const Wrapper = styled(Box)`
  position: relative;
`;

export const PopupContent = styled(Box)<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 105%;
  width: 300px;
  height: 400px;
  background-color: white;
  z-index: 10;
  padding: 8px;
  transition: display 0.5s;
  ${({
    $show,
    theme: {
      colorSchemes: {
        palette: { gray },
      },
      borderRadius,
    },
  }) => `
   display: ${$show ? "block" : "none"};
   border-radius: ${borderRadius.lg};
   box-shadow: 0px 0px 2px ${gray[50]};
   border: 1px solid ${gray[50]};
`}
`;

export const PopupButton = styled(IconButton)`
  position: relative;
  margin: auto;
`;
