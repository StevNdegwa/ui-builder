import { Input, SliderInput, FlexBox } from "@ui/components";
import { FC, FormEventHandler, useState } from "react";
import { Control, InputsWrapper } from "./styles";

export const Length: FC<BuilderFieldProps> = ({ onChange }) => {
  const [inputType, setInputType] = useState<"px" | "%">("px");

  const setPXInputType = () => setInputType("px");
  const setPercentageInputType = () => setInputType("%");

  const getVariant = (i: string): "outlined" | "solid" =>
    inputType === i ? "solid" : "outlined";

  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.currentTarget.value;

    if (newValue && onChange) {
      onChange(
        inputType === "px"
          ? `${event.currentTarget.value}px`
          : `${event.currentTarget.value}%`
      );
    }
  };

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
      <InputsWrapper>
        {inputType === "px" && (
          <Input type="number" onChange={handleChange} placeholder={"0"} />
        )}
        {inputType === "%" && (
          <SliderInput min={0} max={100} onChange={handleChange} />
        )}
      </InputsWrapper>
    </FlexBox>
  );
};
