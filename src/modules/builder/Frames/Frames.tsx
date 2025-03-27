import { forwardRef } from "react";
import { Actions } from "./styles";

export type FramesProps = {
  resizeActionsRef: React.RefObject<SVGGElement | null>;
  addActionsRef: React.RefObject<SVGGElement | null>;
};

export const Frames = forwardRef<SVGGElement>((_, ref) => {
  return <Actions ref={ref} />;
});
