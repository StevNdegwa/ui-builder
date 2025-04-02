import React, { FC, PropsWithChildren } from "react";
import { FlexBox } from "@ui/components";

export type FieldProps = PropsWithChildren<{
  label: React.ReactNode;
  name: string;
}>;

export const _Field: FC<FieldProps> = ({ children, label, name }) => {
  return (
    <FlexBox direction="column" gap="xs">
      <label htmlFor={name}>{label}</label>
      {children}
    </FlexBox>
  );
};
