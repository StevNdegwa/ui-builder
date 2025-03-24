import clsx from "clsx";
import React, { forwardRef } from "react";
import { Wrapper } from "./styles";

export type TextInputProps = React.HTMLAttributes<HTMLInputElement> &
  Partial<{
    size: "sm" | "md" | "lg";
    type: "text" | "password" | "email" | "number";
    placeholder: string;
  }>;

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ size, className, ...props }, ref) => {
    const elementClasses = clsx(className, {
      [`${size}-size`]: !!size,
    });

    return <Wrapper {...props} className={elementClasses} ref={ref} />;
  }
);
