import { FC } from "react";
import { Wrapper } from "./style";

export type ColorInputProps = React.HTMLAttributes<HTMLInputElement>;

export const ColorInput: FC<ColorInputProps> = (props) => {
  return <Wrapper {...props} type="color" />;
};
