import { Input } from "@ui/components";
import { FC } from "react";

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
