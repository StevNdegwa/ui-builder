import { FlexBox, Input, SliderInput } from "@ui/components";
import { Control, InputsWrapper } from "./style";
import { FC, FormEventHandler, useState } from "react";

const SizeInput: FC<{
  onChange: (newValue: string) => void;
  inputType: "px" | "%";
  name: "width" | "height";
}> = ({ onChange, inputType, name }) => {
  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.currentTarget.value;

    if (newValue && onChange) {
      onChange(
        `${name}:${
          inputType === "px"
            ? `${event.currentTarget.value}px`
            : `${event.currentTarget.value}%`
        }`
      );
    }
  };

  return (
    <FlexBox direction="column" gap="xs">
      <FlexBox>
        <InputsWrapper>
          {inputType === "px" && (
            <Input type="number" onChange={handleChange} placeholder={"0"} />
          )}
          {inputType === "%" && (
            <SliderInput min={0} max={100} onChange={handleChange} />
          )}
        </InputsWrapper>
      </FlexBox>
    </FlexBox>
  );
};

export const Size: FC<BuilderFieldProps<string>> = ({ onChange }) => {
  const [inputType, setInputType] = useState<"px" | "%">("px");
  const setPXInputType = () => setInputType("px");
  const setPercentageInputType = () => setInputType("%");

  const getVariant = (i: string): "outlined" | "solid" =>
    inputType === i ? "solid" : "outlined";

  return (
    <FlexBox direction="column" gap="xs">
      <FlexBox>
        <Control
          onClick={setPXInputType}
          variant={getVariant("px")}
          color="secondary"
        >
          PX
        </Control>
        <Control
          onClick={setPercentageInputType}
          variant={getVariant("%")}
          color="secondary"
        >
          %
        </Control>
      </FlexBox>
      <FlexBox gap="xs">
        <SizeInput inputType={inputType} name="width" onChange={onChange} />
        <SizeInput inputType={inputType} name="height" onChange={onChange} />
      </FlexBox>
    </FlexBox>
  );
};
