import clsx from "clsx";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { Wrapper } from "./styles";

export type ButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outlined" | "text";
    color?: "primary" | "secondary" | "gray";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    loading?: boolean;
    disabled?: boolean;
  }
>;

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
