import { FC } from "react";
import { Wrapper } from "./styles";

export type TextAreaProps = React.HTMLAttributes<HTMLTextAreaElement> &
  Partial<{
    placeholder: string;
  }>;

export const TextArea: FC<TextAreaProps> = ({ ...props }) => {
  return <Wrapper {...props}></Wrapper>;
};
