import { BuildableControl } from "./BuildableControl";

type ElementBox = {
  width: number;
  height: number;
  leftPadding?: number;
  topPadding?: number;
  rightPadding?: number;
  bottomPadding?: number;
};

type Pos = {
  x: number;
  y: number;
};

type BuildableFrameConfig = ElementBox &
  Pos & {
    uniqueId: string;
    elementControl: BuildableControl;
  };

type BuilderFieldValue = string | number | boolean;

type BuilderFieldProps = {
  name: string;
  onChange: (newValue: BuilderFieldValue) => void;
};
