import { BuilderFieldProps } from "@modules/builder/type";
import { ColorInput } from "@ui/components";
import { FC } from "react";

export const Color: FC<BuilderFieldProps> = ({ onChange, ...props }) => {
  return (
    <ColorInput
      {...props}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
