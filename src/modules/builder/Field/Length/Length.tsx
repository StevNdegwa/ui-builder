import { FlexBox } from "@ui/components";
import { ChangeEventHandler, FC, PropsWithChildren, useState } from "react";
import { DropDownWrapper, SizeInput, TextWrapper } from "./styles";

export const Length: FC<PropsWithChildren<BuilderFieldProps<string>>> = ({
  onChange,
  children,
}) => {
  const [maxSize, setMaxSize] = useState(Infinity);
  const [inputType, setInputType] = useState<"px" | "%">("px");
  const [value, setValue] = useState(0);

  const handleInputTypeChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const newValue = event.target.value;

    setInputType(() => {
      if (newValue === "px") {
        setMaxSize(Infinity);
      } else if (newValue === "%") {
        setMaxSize(100);
        if (value > 100) {
          setValue(100);
        }
      }

      return newValue as "px" | "%";
    });

    setValue((prevValue) => {
      onChange(value + newValue);
      return prevValue;
    });
  };

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseInt(event.target.value, 10);

    if (!isNaN(newValue) && newValue <= maxSize) {
      setValue(newValue);
      onChange(newValue + inputType);
    }
  };

  return (
    <FlexBox align="center" gap="sm">
      <TextWrapper size="lg" weight="light">
        {children || "Length"}
      </TextWrapper>
      <FlexBox gap="xs">
        <SizeInput
          size="sm"
          max={maxSize}
          value={value}
          onChange={handleValueChange}
        />
        <DropDownWrapper
          onChange={handleInputTypeChange}
          size="sm"
          options={[
            { label: "Px", value: "px" },
            { label: "%", value: "%" },
          ]}
        />
      </FlexBox>
    </FlexBox>
  );
};
