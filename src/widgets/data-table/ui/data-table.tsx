import { useMutation, useQuery } from "@tanstack/react-query";
import { GridValidRowModel, useGridApiRef } from "@mui/x-data-grid";
import { shallowEqualObjects } from "shallow-equal";
import { NewDocSchema, ValidDocSchema } from "../model/schema.ts";
import { columnGroupingModel, columns } from "../model/columns.ts";
import { initialState } from "../model/initial-state.ts";
import { StyledDataTable } from "../lib/styled-table.ts";
import {
  getRowClassName,
  onCellDoubleClick,
  onCellKeyDown,
  onRowEditStop,
} from "../lib/table-methods.ts";
import { addRecordMutation, deleteRecordMutation, updateRecordMutation } from "../api/api.ts";
import { docsQuery } from "shared/api/api.ts";
import useAlert from "shared/ui/use-alert.tsx";

const TABLE_CONFIG = {
  autoHeight: true,
  hideFooterSelectedRowCount: true,
  editMode: "row" as const,
  rowHeight: 80,
  sortingOrder: ["asc", "desc"] as const,
  columnGroupingModel,
  columns,
  initialState,
  onCellKeyDown,
  onCellDoubleClick,
  onRowEditStop,
  getRowClassName,
};

export const DataTable = () => {
  const apiRef = useGridApiRef();
  const { data } = useQuery(docsQuery);
  const addRecord = useMutation(addRecordMutation);
  const updateRecord = useMutation(updateRecordMutation);
  const deleteRecord = useMutation(deleteRecordMutation);
  const [alert, onAlert] = useAlert();

  const processRowUpdate = (n: GridValidRowModel, o: GridValidRowModel) => {
    const { mode } = n;

    if (mode === "add") {
      const doc = NewDocSchema.parse(n);
      addRecord.mutate(
        { doc, docId: n.id as string },
        {
          onError: () => {
            onAlert("Что-то пошло не так", "Детали с описанием ошибки в консоли");
          },
        },
      );
    }
    if (mode === "update") {
      if (shallowEqualObjects(n, o)) return o;
      const doc = ValidDocSchema.parse(n);
      updateRecord.mutate(
        { doc, docId: doc.id },
        {
          onError: () => {
            onAlert("Что-то пошло не так", "Детали с описанием ошибки в консоли");
          },
        },
      );
    }
    if (mode === "delete") {
      const doc = ValidDocSchema.parse(n);
      deleteRecord.mutate(
        { docId: doc.id },
        {
          onError: () => {
            onAlert("Что-то пошло не так", "Детали с описанием ошибки в консоли");
          },
        },
      );
      return { id: doc.id, _action: "delete" };
    }

    return n;
  };

  return (
    <div>
      <StyledDataTable
        {...TABLE_CONFIG}
        apiRef={apiRef}
        rows={data}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error: Error) => {
          onAlert("Что-то пошло не так", "Детали с описанием ошибки в консоли");
          console.log("onProcessRowUpdateError", error, error.message);
        }}
      />
      {alert}
    </div>
  );
};
