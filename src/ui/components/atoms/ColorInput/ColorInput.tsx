import { FC, HTMLProps, useState } from "react";
import { ColorPreview, InputWrapper } from "./style";

export type ColorInputProps = HTMLProps<HTMLInputElement> & {
  defaultValue?: string;
};

export const ColorInput: FC<ColorInputProps> = ({
  onChange,
  defaultValue,
  ...props
}) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setValue(newValue);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <ColorPreview style={{ backgroundColor: value }}>
      <InputWrapper
        {...props}
        onChange={handleChange}
        type="color"
        value={value}
      />
    </ColorPreview>
  );
};
