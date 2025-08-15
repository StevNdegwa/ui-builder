import { FC, FormEventHandler, useCallback, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { FaCheckCircle } from "react-icons/fa";
import { Button, Input } from "@ui/components";
import { Wrapper } from "./style";

const shortUniqueID = new ShortUniqueId({
  length: 4,
});

export type AddRowProps = {
  addRow: (row: DataTableRow) => void;
};

export const AddRow: FC<AddRowProps> = ({ addRow }) => {
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleLabelChange: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setLabel(event.currentTarget.value);
    },
    [setLabel]
  );

  const handleValueChange: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.currentTarget.value);
    },
    [setValue]
  );

  const handleAddRow = useCallback(() => {
    if (label && value) {
      addRow({ id: shortUniqueID.randomUUID(), label, value });
      setLabel("");
      setValue("");
    }
  }, [addRow, label, value]);

  return (
    <Wrapper direction="row" gap={"xs"} align="center">
      <Input
        size="sm"
        placeholder="Label"
        type="text"
        onChange={handleLabelChange}
        value={label}
      />
      <Input
        size="sm"
        placeholder="Value"
        type="number"
        onChange={handleValueChange}
        value={value}
      />
      <Button size="xs" color="success" onClick={handleAddRow}>
        <FaCheckCircle />
      </Button>
    </Wrapper>
  );
};
