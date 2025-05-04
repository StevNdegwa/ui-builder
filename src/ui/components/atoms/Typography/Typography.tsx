import { HTMLProps } from "react";
import clsx from "clsx";
import { Wrapper } from "./styles";
import { AtomComponentProps } from "../types";

export type TypographyProps = Omit<HTMLProps<HTMLSpanElement>, "size"> &
  AtomComponentProps &
  Partial<{
    variant: "solid" | "outline";
    weight: "light" | "regular" | "medium" | "bold";
    textShadow: "xs" | "sm" | "md" | "lg" | "xl";
    textAlign: "left" | "center" | "right";
    size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
    heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }>;

export const Typography: React.FC<TypographyProps> = ({
  color = "dark",
  children,
  className,
  element,
  size = "md",
  weight = "regular",
  heading,
  variant,
  textAlign,
  textShadow,
  ...props
}) => {
  const elementClasses = clsx(
    className,
    `${color}-color-text`,
    `${size}-text-size`,
    `${weight}-text-weight`,
    {
      [`${variant}-text-variant`]: !!variant,
      [`text-shadow-${textShadow}`]: !!textShadow,
      [`text-align-${textAlign}`]: !!textAlign,
    }
  );

  return (
    <Wrapper
      {...props}
      as={heading || element || "span"}
      className={elementClasses}
    >
      {children}
    </Wrapper>
  );
};
