import { FC, HTMLProps } from "react";
import { Wrapper } from "./style";
import clsx from "clsx";

export type SliderInputProps = HTMLProps<HTMLInputElement> &
  Partial<{
    size: "sm" | "md" | "lg";
  }>;

export const SliderInput: FC<SliderInputProps> = ({
  className,
  size,
  ...props
}) => {
  const elementClasses = clsx(className, {
    [`${size}-size`]: !!size,
  });

  return <Wrapper {...props} className={elementClasses} type="range" />;
};
