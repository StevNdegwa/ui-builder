import {
  Button,
  ColorInput,
  FlexBox,
  LengthInputControl,
} from "@ui/components";
import { FC } from "react";
import { BuildableFrameConfig } from "../type";
import { Wrapper } from "./styles";

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
        <FlexBox gap="xs">
          <LengthInputControl
            placeholder="Width"
            onChange={(newLen) => element.updateProperties("width", newLen)}
          />
          <LengthInputControl
            placeholder="Height"
            onChange={(newLen) => element.updateProperties("height", newLen)}
          />
        </FlexBox>
        <ColorInput
          onChange={(event) =>
            element.updateProperties(
              "background-color",
              (event.target as HTMLInputElement).value
            )
          }
        />
      </FlexBox>
      <FlexBox justify="space-between" direction="column" gap="xs">
        <Button color="primary">Copy Document</Button>
        <Button color="primary">Copy Section</Button>
      </FlexBox>
    </Wrapper>
  ));
};
