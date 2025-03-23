import clsx from "clsx";
import React, { forwardRef, HTMLInputTypeAttribute } from "react";
import { Wrapper } from "./styles";

export type TextInputProps = React.HTMLAttributes<HTMLInputElement> & {
  size?: "sm" | "md" | "lg";
  type: HTMLInputTypeAttribute;
  placeholder: string;
};

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ size, className, ...props }, ref) => {
    const elementClasses = clsx(className, {
      [`${size}-size`]: !!size,
    });

    return <Wrapper {...props} className={elementClasses} ref={ref} />;
  }
);
