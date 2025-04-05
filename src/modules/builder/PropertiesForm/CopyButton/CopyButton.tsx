import { FC, PropsWithChildren } from "react";
import { Clipboard } from "@modules/system/Clipboard";
import { Wrapper } from "./styles";
import { useBuilderContext } from "@modules/builder/BuilderContext";

export type CopyButtonProps = PropsWithChildren<{
  getCopyString: () => string;
}>;

export const CopyButton: FC<CopyButtonProps> = ({
  children,
  getCopyString,
}) => {
  const { notify } = useBuilderContext();

  const handleClick = () => {
    const sectionString = getCopyString();
    Clipboard.copyText(sectionString)
      .then(() => {
        console.log("Copied section::", sectionString);

        notify("Section copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying section to clipboard:", error);
        notify("Failed to copy section");
      });
  };

  return <Wrapper onClick={handleClick}>{children}</Wrapper>;
};
