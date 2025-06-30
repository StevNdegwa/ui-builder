import { FC } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { Clipboard } from "@modules/system/Clipboard";
import { useBuilderContext } from "@modules/builder/BuilderContext";
import { IconButton } from "@ui/components";

export type CopyButtonProps = {
  getCopyString: () => string;
  title?: string;
};

export const CopyElement: FC<CopyButtonProps> = ({ getCopyString, title }) => {
  const { notify } = useBuilderContext();

  const handleClick = () => {
    const sectionString = getCopyString();
    Clipboard.copyText(sectionString)
      .then(() => {
        console.log("Copied section::", sectionString);

        notify(`${title} copied to clipboard`);
      })
      .catch((error) => {
        console.error("Error copying section to clipboard:", error);
        notify(`Failed to copy ${title} to clipboard`);
      });
  };

  return (
    <IconButton
      icon={<ClipboardDocumentIcon width={24} />}
      color="gray"
      onClick={handleClick}
    />
  );
};
