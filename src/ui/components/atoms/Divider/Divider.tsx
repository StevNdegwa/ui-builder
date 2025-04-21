import clsx from "clsx";
import { Wrapper } from "./styles";
import { FC } from "react";

export type DividerProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const Divider: FC<DividerProps> = ({ size = "xs" }) => {
  const className = clsx({
    [`${size}-divider`]: !!size,
  });

  return <Wrapper className={className} />;
};
