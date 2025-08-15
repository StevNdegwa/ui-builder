import { Field } from "../Field";

const { Length, Color, SinglelineText, DataTable, Size, WysiwygEditor, ImageInput, LayoutSelect } = Field;

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
    component: WysiwygEditor,
    label: "Text Content",
  },
  "image-source": {
    component: ImageInput,
    label: "Image",
  },
  size: {
    component: Size,
    label: "Size",
  },
  chartData: {
    component: DataTable,
    label: "Data",
  },
  barColor: {
    component: Color,
    label: "Bar Color",
  },
  layout: {
    component: LayoutSelect,
    label: "Layout",
  },
};

export const defaultBuildableControlsConfig = {
  component: Length,
  label: "Property",
};
