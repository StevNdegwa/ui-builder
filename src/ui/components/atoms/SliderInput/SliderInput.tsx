import { FC } from "react";
import { Wrapper } from "./style";
import clsx from "clsx";

export type SliderInputProps = React.HTMLAttributes<HTMLInputElement> &
  Partial<{
    size: "sm" | "md" | "lg";
    max: number;
    min: number;
    step: number;
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
