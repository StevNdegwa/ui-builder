import clsx from "clsx";
import { forwardRef, HTMLProps } from "react";
import { Wrapper } from "./styles";

export type TextInputProps = Omit<HTMLProps<HTMLInputElement>, "size"> &
  Partial<{
    size: "sm" | "md" | "lg";
  }>;

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  ({ size, className, ...props }, ref) => {
    const elementClasses = clsx(className, {
      [`${size}-size`]: !!size,
    });

    return <Wrapper {...props} className={elementClasses} ref={ref} />;
  }
);
