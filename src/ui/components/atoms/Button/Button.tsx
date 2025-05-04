import clsx from "clsx";
import { forwardRef, HTMLProps } from "react";
import { Wrapper } from "./styles";

export type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, "size"> &
  Partial<{
    variant: "solid" | "outlined" | "text";
    color: "primary" | "secondary" | "gray" | "danger" | "success";
    size: "xs" | "sm" | "md" | "lg" | "xl";
    loading: boolean;
    type: "button" | "submit" | "reset";
  }>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, color, size, loading, className, ...props }, ref) => {
    const classList = clsx(className, {
      [`${variant}-variant`]: !!variant,
      [`${color}-color`]: !!color,
      [`${size}-size`]: !!size,
    });

    return (
      <Wrapper {...props} className={classList} $loading={loading} ref={ref}>
        {children}
      </Wrapper>
    );
  }
);
