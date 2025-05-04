import { ColorInput } from "@ui/components";
import { FC } from "react";

export const Color: FC<BuilderFieldProps<string>> = ({
  onChange,
  initialValue,
  ...props
}) => {
  return (
    <ColorInput
      {...props}
      defaultValue={initialValue}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
