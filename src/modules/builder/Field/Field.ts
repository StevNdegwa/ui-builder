import { _Field } from "./_Field";
import { Color } from "./Color";
import { Length } from "./Length";
import { MultilineText } from "./MultilineText";
import { SinglelineText } from "./SinglelineText";
import { Size } from "./Size";

export const Field = Object.assign(_Field, {
  Length,
  Color,
  MultilineText,
  SinglelineText,
  Size,
});
