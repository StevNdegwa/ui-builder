import { BuildableControl } from "@modules/builder/BuildableControl";
import { Box } from "@ui/components";
import { FC, useMemo } from "react";

export type FormItemsProps = {
  element: BuildableControl;
};

export const FormItems: FC<FormItemsProps> = ({ element }) => {
  const items = useMemo(
    () => element?.getElementPropertiesConfigs() || [],
    [element]
  );

  return items.map((config, index) => <Box key={index}>{config}</Box>);
};
