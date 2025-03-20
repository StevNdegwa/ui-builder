import { Typography } from "@ui/components";
import { Wrapper } from "./styles";

export const Footer = () => {
  return (
    <Wrapper element="footer" align="center">
      <Typography>Copyright @{new Date().getFullYear()}</Typography>
    </Wrapper>
  );
};
