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

type BuilderFieldValue = string | number | boolean;

type BuilderFieldProps = {
  name: string;
  onChange: (newValue: BuilderFieldValue) => void;
};
