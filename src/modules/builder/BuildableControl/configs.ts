import { Field } from "../Field";

const { Length, Color, MultilineText, SinglelineText, DataTable, Size } = Field;

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
  "image-source": {
    component: SinglelineText,
    label: "Image URL",
  },
  size: {
    component: Size,
    label: "Size",
  },
  chartData: {
    component: DataTable,
    label: "Data",
  },
};

export const defaultBuildableControlsConfig = {
  component: Length,
  label: "Property",
};
