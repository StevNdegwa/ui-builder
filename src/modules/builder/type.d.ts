import { BuildableControl } from "./BuildableControl";

type ElementBox = {
  width: number;
  height: number;
};

type Pos = {
  x: number;
  y: number;
};

type BuildableFrameConfig = ElementBox &
  Pos & {
    elementControl: BuildableControl;
  };

type BuilderFieldValue = string | number | boolean;

type BuilderFieldProps = {
  name: string;
  onChange: (newValue: BuilderFieldValue) => void;
};
