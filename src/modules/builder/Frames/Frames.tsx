import { FC } from "react";
import { AddActions, ResizeActions } from "./styles";

export type FramesProps = {
  elements: BuildableFrameConfig[];
  resizeActionsRef: React.RefObject<SVGGElement | null>;
  addActionsRef: React.RefObject<SVGGElement | null>;
};

export const Frames: FC<FramesProps> = ({
  resizeActionsRef,
  addActionsRef,
}) => {
  return (
    <>
      <ResizeActions ref={resizeActionsRef} />
      <AddActions ref={addActionsRef} />
    </>
  );
};
