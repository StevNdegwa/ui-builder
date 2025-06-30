import { forwardRef, HTMLProps } from "react";
import clsx from "clsx";
import { Wrapper } from "./styles";
import { AtomComponentProps } from "../types";

export type BoxProps = AtomComponentProps &
  HTMLProps<HTMLDivElement> &
  Partial<{
    padding: "xs" | "sm" | "md" | "lg" | "xl";
    margin: "xs" | "sm" | "md" | "lg" | "xl";
    rounded: "xs" | "sm" | "md" | "lg" | "xl";
  }>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    { children, element, className, margin, padding, rounded, ...props },
    ref
  ) => {
    console.log("\n Box rendered >> ", ref);

    const elementClasses = clsx(className, {
      [`padding-${padding}`]: !!padding,
      [`margin-${margin}`]: !!margin,
      [`rounded-${rounded}`]: !!rounded,
    });

    return (
      <Wrapper {...props} className={elementClasses} as={element} ref={ref}>
        {children}
      </Wrapper>
    );
  }
);
