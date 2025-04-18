import { forwardRef } from "react";
import { Wrapper } from "./styles";

export const Resize = forwardRef<SVGGElement>((_, ref) => {
  return <Wrapper ref={ref} />;
});
