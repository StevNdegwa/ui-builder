import { Button, FlexBox, Input } from "@ui/components";
import { FC, FormEventHandler, useCallback, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

export type RowProps = {
  data: DataTableRow;
  remove: () => void;
  update(row: DataTableRow): void;
};

export const Row: FC<RowProps> = ({
  data: { id, label, value },
  remove,
  update,
}) => {
  const [rowLabel, setRowLabel] = useState<string>(label);
  const [rowValue, setRowValue] = useState<string>(value);

  const handleLabelChange: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setRowLabel(event.currentTarget.value);
      update({ id, label: event.currentTarget.value, value: rowValue });
    },
    [id, rowValue, update]
  );

  const handleValueChange: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setRowValue(event.currentTarget.value);
      update({ id, label: rowLabel, value: event.currentTarget.value });
    },
    [id, rowLabel, update]
  );

  return (
    <FlexBox direction="row" gap={"xs"} align="center">
      <Input
        size="sm"
        placeholder="Label"
        type="text"
        onChange={handleLabelChange}
        value={rowLabel}
      />
      <Input
        size="sm"
        placeholder="Value"
        type="number"
        onChange={handleValueChange}
        value={rowValue}
      />
      <Button size="xs" color="danger" onClick={remove}>
        <FaTimesCircle />
      </Button>
    </FlexBox>
  );
};
