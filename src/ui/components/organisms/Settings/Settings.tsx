import { FlexBox, Typography } from "@ui/components";
import { Wrapper } from "./styles";
import { FC, PropsWithChildren } from "react";

export type SettingsProps = PropsWithChildren;

export const Settings: FC<SettingsProps> = ({ children }) => {
  return (
    <Wrapper element="section">
      <FlexBox direction="column" gap="sm">
        <Typography heading="h2">Element settings</Typography>
        {children}
      </FlexBox>
    </Wrapper>
  );
};
