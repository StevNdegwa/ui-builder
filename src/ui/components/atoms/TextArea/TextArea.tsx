import { FC, HTMLProps } from "react";
import { Wrapper } from "./styles";

export type TextAreaProps = HTMLProps<HTMLTextAreaElement>;

export const TextArea: FC<TextAreaProps> = ({ ...props }) => {
  return <Wrapper {...props}></Wrapper>;
};
