import { FlexBox } from "@ui/components";
import { FC } from "react";
import { BuildableFrameConfig } from "../type";
import { FormButton, Wrapper } from "./styles";

export type PropertiesFormProps = {
  elementsControls: Array<BuildableFrameConfig>;
  activeElementIndex: number;
};

export const PropertiesForm: FC<PropertiesFormProps> = ({
  elementsControls,
  activeElementIndex,
}) => {
  return elementsControls.map(({ element }, index) => (
    <Wrapper
      $show={index === activeElementIndex}
      direction="column"
      gap="md"
      key={index}
    >
      <FlexBox direction="column" gap="sm">
        {element.getElementPropertiesConfigs().map((config, index) => (
          <div key={index}>{config}</div>
        ))}
      </FlexBox>
      <FlexBox justify="space-between" direction="row" gap="xs">
        <FormButton color="primary">Copy Document</FormButton>
        <FormButton color="primary">Copy Section</FormButton>
      </FlexBox>
    </Wrapper>
  ));
};
