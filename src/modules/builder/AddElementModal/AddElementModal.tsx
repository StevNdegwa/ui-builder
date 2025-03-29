import { FC } from "react";
import { Button, Modal } from "@ui/components";
import { BuildableControl } from "../BuildableControl";

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
  const onAddElement = () => {
    buildable.insertChildElement();
    close();
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div>
        <Button onClick={onAddElement}>Add Element</Button>
      </div>
    </Modal>
  );
};
