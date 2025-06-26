import { FlexBox } from "@ui/components";
import { FC } from "react";
import { Length } from "../Length";

export const Size: FC<BuilderFieldProps<string>> = ({ onChange }) => {
  const handleHeightChange = (newValue: string) => {
    console.log("NewSize height change", newValue);

    onChange(`height:${newValue}`);
  };

  const handlerWidthChange = (newValue: string) => {
    console.log("NewSize width change", newValue);

    onChange(`width:${newValue}`);
  };

  return (
    <FlexBox direction="column" gap="xs">
      <Length onChange={handlerWidthChange} name="">
        Width
      </Length>
      <Length onChange={handleHeightChange} name="">
        Height
      </Length>
    </FlexBox>
  );
};
