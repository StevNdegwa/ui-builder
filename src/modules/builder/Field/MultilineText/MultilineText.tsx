import { TextArea } from "@ui/components";
import { FC } from "react";

export const MultilineText: FC<BuilderFieldProps<string>> = ({
  onChange,
  initialValue,
  ...props
}) => {
  return (
    <TextArea
      {...props}
      defaultValue={initialValue}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};
