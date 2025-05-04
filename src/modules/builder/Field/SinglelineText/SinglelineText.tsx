import { Input } from "@ui/components";
import { FC } from "react";

export const SinglelineText: FC<BuilderFieldProps<string>> = ({
  onChange,
  initialValue,
  ...props
}) => {
  return (
    <Input
      {...props}
      defaultValue={initialValue}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
