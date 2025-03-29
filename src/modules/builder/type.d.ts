import { BuildableControl } from "./BuildableControl";

type Pos = {
  x: number;
  y: number;
};

type BuildableFrameConfig = {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  element: BuildableControl;
};
