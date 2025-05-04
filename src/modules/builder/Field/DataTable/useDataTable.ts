import { useCallback, useEffect, useReducer } from "react";

export default function useDataTable(
  onChange: (rows: DataTableRow[]) => void,
  initialValue: DataTableRow[] = []
) {
  const [rows, dispatch] = useReducer(
    (
      state: DataTableRow[],
      action: {
        type: string;
        payload: {
          row?: DataTableRow;
          id?: string;
        };
      }
    ): DataTableRow[] => {
      switch (action.type) {
        case "ADD_ROW":
          return !action.payload.row ? state : [...state, action.payload.row];
        case "REMOVE_ROW":
          return state.filter((row) => row.id !== action.payload.id);
        case "UPDATE_ROW":
          return state.map((row) =>
            row.id === action.payload.row?.id
              ? { ...row, ...action.payload.row }
              : row
          );
        default:
          return state;
      }
    },
    initialValue
  );

  const addRow = useCallback(
    (row: DataTableRow) => {
      dispatch({ type: "ADD_ROW", payload: { row } });
    },
    [dispatch]
  );

  const removeRowById = useCallback(
    (id: string) => {
      dispatch({ type: "REMOVE_ROW", payload: { id } });
    },
    [dispatch]
  );

  const updateRow = useCallback(
    (row: DataTableRow) => {
      dispatch({ type: "UPDATE_ROW", payload: { row } });
    },
    [dispatch]
  );

  useEffect(() => {
    onChange(rows);
  }, [onChange, rows]);

  return {
    rows,
    addRow,
    removeRowById,
    updateRow,
  };
}
