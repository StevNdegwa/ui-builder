import { FC } from "react";
import { Typography, TypographyProps } from "@ui/components/atoms";

export type TitleProps = TypographyProps;

export const Title: FC<TitleProps> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};
