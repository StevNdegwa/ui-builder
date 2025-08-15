import { _Field } from "./_Field";
import { Color } from "./Color";
import { DataTable } from "./DataTable";
import { Length } from "./Length";
import { MultilineText } from "./MultilineText";
import { SinglelineText } from "./SinglelineText";
import { Size } from "./Size";
import { WysiwygEditor } from "./WysiwygEditor";
import { ImageInput } from "./ImageInput";
import { LayoutSelect } from "./LayoutSelect";

export const Field = Object.assign(_Field, {
  Length,
  Color,
  MultilineText,
  SinglelineText,
  Size,
  DataTable,
  WysiwygEditor,
  ImageInput,
  LayoutSelect,
});
