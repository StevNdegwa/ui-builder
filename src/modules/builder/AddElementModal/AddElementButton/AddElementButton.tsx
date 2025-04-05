import { FC } from "react";
import { Typography } from "@ui/components";
import { Icon, Label, Wrapper } from "./styles";
import { IconType } from "react-icons/lib";

export type AddElementButtonProps = {
  onAddElement: (name: BuildableElementNames) => void;
  label: string;
  elementName: BuildableElementNames;
  icon: IconType;
};

export const AddElementButton: FC<AddElementButtonProps> = ({
  label,
  onAddElement,
  elementName,
  icon: ElementIcon,
}) => {
  return (
    <Wrapper direction="column" onClick={() => onAddElement(elementName)}>
      <Icon align="center" justify="center">
        <ElementIcon size={40} />
      </Icon>
      <Label align="center" justify="center">
        <Typography weight="bold">{label}</Typography>
      </Label>
    </Wrapper>
  );
};
