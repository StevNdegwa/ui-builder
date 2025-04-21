import { FC } from "react";
import { FlexBox, Modal } from "@ui/components";
import { MdOutlineTextSnippet, MdAddPhotoAlternate } from "react-icons/md";
import { AddElementButton } from "./AddElementButton";
import { useBuilderContext } from "../BuilderContext";

export type AddElementModalProps = {
  isOpen: boolean;
  close: () => void;
};

export const AddElementModal: FC<AddElementModalProps> = ({
  isOpen,
  close,
}) => {
  const { activeBuildableControl } = useBuilderContext();

  const onAddElement = (name: BuildableElementNames) => {
    activeBuildableControl?.elementControl.insertChildElement(name);
    close();
  };

  if (!activeBuildableControl) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <FlexBox gap="md">
        <AddElementButton
          icon={MdOutlineTextSnippet}
          onAddElement={onAddElement}
          elementName="ui-text"
          label="Text"
        />
        <AddElementButton
          icon={MdAddPhotoAlternate}
          onAddElement={onAddElement}
          elementName="ui-image"
          label="Image"
        />
      </FlexBox>
    </Modal>
  );
};
