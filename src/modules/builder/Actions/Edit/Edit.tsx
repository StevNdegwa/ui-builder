import { forwardRef } from "react";
import { Wrapper } from "./styles";

export const Edit = forwardRef<SVGGElement>((_, ref) => {
  return <Wrapper ref={ref} />;
});
