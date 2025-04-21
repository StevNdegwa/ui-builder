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

type BuildableFrameConfig<ControlType> = ElementBox &
  Pos & {
    uniqueId: string;
    elementControl: ControlType;
  };

type BuilderFieldValue = string | number | boolean;

type BuilderFieldProps = {
  name: string;
  onChange: (newValue: BuilderFieldValue) => void;
};

type ElementConfigType = {
  name: string;
  classNames?: string[];
  textContent?: string;
  attributes?: Record<string, string | number | boolean>;
  events?: Record<string, EventListener>;
  children?: ElementConfigType[];
  data?: Record<string, string | number | boolean>;
};
