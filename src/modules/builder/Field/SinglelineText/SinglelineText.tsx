import { Input } from "@ui/components";
import { FC } from "react";
import { BuilderFieldProps } from "@modules/builder/type";

export const SinglelineText: FC<BuilderFieldProps> = ({
  onChange,
  ...props
}) => {
  return (
    <Input
      {...props}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
