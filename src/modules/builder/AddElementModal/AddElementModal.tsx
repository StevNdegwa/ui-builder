import { FC } from "react";
import { MdOutlineTextSnippet } from "react-icons/md";
import { Modal, Typography } from "@ui/components";
import { BuildableControl } from "../BuildableControl";
import { ElementCard, ElementCardIcon, ElementCardLabel } from "./styles";

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
      <ElementCard direction="column" onClick={() => onAddElement("ui-text")}>
        <ElementCardIcon align="center" justify="center">
          <MdOutlineTextSnippet size={40} />
        </ElementCardIcon>
        <ElementCardLabel align="center" justify="center">
          <Typography weight="bold">Text</Typography>
        </ElementCardLabel>
      </ElementCard>
    </Modal>
  );
};
