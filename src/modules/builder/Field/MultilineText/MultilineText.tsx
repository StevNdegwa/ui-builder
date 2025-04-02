import { BuilderFieldProps } from "@modules/builder/type";
import { TextArea } from "@ui/components";
import { FC } from "react";

export const MultilineText: FC<BuilderFieldProps> = ({
  onChange,
  ...props
}) => {
  return (
    <TextArea
      {...props}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
