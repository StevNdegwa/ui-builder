import { FC, DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { Wrapper } from "./style";
import clsx from "clsx";

export type DropdownProps = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "size"
> &
  Partial<{
    size: "xs" | "sm" | "md" | "lg";
    options: {
      value: string;
      label: string;
    }[];
  }>;

export const DropDown: FC<DropdownProps> = ({
  options = [],
  size,
  className,
  ...props
}) => {
  const elementClasses = clsx(className, {
    [`${size}-size`]: !!size,
  });

  return (
    <Wrapper {...props} className={elementClasses}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Wrapper>
  );
};
