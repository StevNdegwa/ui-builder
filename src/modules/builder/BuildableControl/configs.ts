import { Field } from "../Field";

const { Length, Color, MultilineText } = Field;

export const buildableControlsConfig = {
  width: {
    component: Length,
    label: "Width",
  },
  height: {
    component: Length,
    label: "Height",
  },
  "background-color": {
    component: Color,
    label: "Background Color",
  },
  "text-content": {
    component: MultilineText,
    label: "Text Content",
  },
};

export const defaultBuildableControlsConfig = {
  component: Length,
  label: "Property",
};
