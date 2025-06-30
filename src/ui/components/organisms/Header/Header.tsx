import { forwardRef } from "react";
import { AppIcon, Wrapper } from "./styles";
import { Box } from "@ui/components/atoms";

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Wrapper element="header" align="center" ref={ref}>
      <Box>
        <AppIcon />
      </Box>
      <Box>
        <Box id="copyDocumentContainer" />
      </Box>
    </Wrapper>
  );
});
