import { FC } from "react";
import { Typography, TypographyProps } from "@ui/components/atoms";

export type DescriptionProps = TypographyProps;

export const Description: FC<DescriptionProps> = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};
