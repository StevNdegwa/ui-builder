import { FC } from "react";
import { FlexBox, Modal } from "@ui/components";
import { MdOutlineTextSnippet, MdAddPhotoAlternate } from "react-icons/md";
import { BuildableControl } from "../BuildableControl";
import { AddElementButton } from "./AddElementButton";

export type AddElementModalProps = {
  isOpen: boolean;
  close: () => void;
  buildable: BuildableControl;
};

export const AddElementModal: FC<AddElementModalProps> = ({
  isOpen,
  close,
  buildable,
}) => {
  const onAddElement = (name: BuildableElementNames) => {
    buildable.insertChildElement(name);
    close();
  };

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
