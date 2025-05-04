import { FC, HTMLProps } from "react";
import { Wrapper } from "./style";

export type ColorInputProps = HTMLProps<HTMLInputElement>;

export const ColorInput: FC<ColorInputProps> = (props) => {
  return <Wrapper {...props} type="color" />;
};
