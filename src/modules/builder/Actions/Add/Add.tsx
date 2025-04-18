import { forwardRef } from "react";
import { Wrapper } from "./styles";

export const Add = forwardRef<SVGGElement>((_, ref) => {
  return <Wrapper ref={ref} />;
});
