import { FC } from "react";
import { FlexBox } from "@ui/components";
import useDataTable from "./useDataTable";
import { Row } from "./Row";
import { AddRow } from "./AddRow";

export const DataTable: FC<BuilderFieldProps<DataTableRow[]>> = ({
  onChange,
  initialValue,
}) => {
  const { rows, addRow, updateRow, removeRowById } = useDataTable(
    onChange,
    initialValue
  );

  return (
    <FlexBox direction="column" gap={"xs"}>
      {rows.map((row) => (
        <Row
          key={row.id}
          data={row}
          remove={() => removeRowById(row.id)}
          update={updateRow}
        />
      ))}
      <AddRow addRow={addRow} />
    </FlexBox>
  );
};
