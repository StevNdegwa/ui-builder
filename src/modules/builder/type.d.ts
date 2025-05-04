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

type BuilderFieldValue = string | number | boolean | DataTableRow[];

type BuilderFieldProps<T> = {
  name: string;
  onChange: (newValue: T) => void;
  initialValue?: T;
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

type DataTableRow = {
  label: string;
  value: string;
  id: string;
};
